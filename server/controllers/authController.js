import { query } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const createUser = async (req, res) => {
    try{
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = await query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, plan',
            [name, email, hashedPassword]
        );

        res.status(201).json(newUser.rows[0]);

    } catch (err){
        if (err.code === '23505') {
            return res.status(400).json({ error: "Email already exists." });
        }
        res.status(500).json({ error: err.message });
    } 
};

export const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required." });
        }
        
        const result = await query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if(result.rows.length === 0) return res.status(401).json({ error : 'Invalid Credentials.' });

        const user = result.rows[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) return res.status(401).json({ error: 'Invalid Credentials.' });

        const token = jwt.sign(
            { id: user.id, plan: user.plan},
            process.env.JWT_SECRET,
            { expiresIn: '7d'}
        );

        res.json({
            message: 'Login Successful',
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                plan: user.plan
            }
        });

    } catch (err){
        res.status(500).json({ error: err.message });
    } 
};