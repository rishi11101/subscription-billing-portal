import { query } from "../db.js";
import { transporter } from '../config/nodemailer.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
    try {
        const { plan_id } = req.body;
        const user_id = req.user.id;

        const result = await query('SELECT * FROM plans WHERE id = $1', [plan_id]);
        const plan = result.rows[0];

        if (!plan) return res.status(404).json({ error: "Plan not found." });
        if (plan.price === 0) {
            return res.status(400).json({ error: "Free plan requires no payment." });
        }

        const order = await razorpay.orders.create({
            amount: plan.price * 100,
            currency: "INR",
            receipt: `receipt_user_${user_id}`
        });

        await query(
            'INSERT INTO payments (user_id, plan_id, razorpay_order_id, status) VALUES ($1, $2, $3, $4)',
            [user_id, plan_id, order.id, 'pending']
        );

        res.json(order);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const verifyPayment = async (req, res) => {
    try {
        const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;
 
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest('hex');

        const isValid = expectedSignature === razorpay_signature;

        if (!isValid) {
            return res.status(400).json({ error: "Invalid payment signature." });
        }
        
        const user_id = req.user.id;

        const paymentResult = await query(
            'SELECT plans.name FROM payments JOIN plans ON payments.plan_id = plans.id WHERE payments.razorpay_order_id = $1',
            [razorpay_order_id]
        );
        const planName = paymentResult.rows[0].name;


        await query(
            'UPDATE payments SET status = $1 WHERE razorpay_order_id = $2',
            ['success', razorpay_order_id]
        );

        await query(
            'UPDATE users SET plan = $1 WHERE id = $2',
            [planName, user_id]
        );

        // Nodemailer
        const userResult = await query('SELECT email, name FROM users WHERE id = $1', [user_id]);
        const { email, name } = userResult.rows[0];

        try {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: `Plan upgraded to ${planName}!`,
                text: `Hi ${name}, your plan has been successfully upgraded to ${planName}. Enjoy the new features!`
            });
            
        } catch (emailErr) {
            console.error("Email failed:", emailErr.message);
        }

        res.json({ message: "Payment successful", plan: planName })

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};