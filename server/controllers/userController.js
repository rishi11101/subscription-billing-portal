import { query } from "../db.js";


export const getUserProfile = async (req, res) => {
    try{
        const id = req.user.id;

        const user = await query('SELECT id, name, email, plan FROM users WHERE id = $1', [id]);

        if (user.rows.length === 0) {
            return res.status(404).json({ error: "User not found." });
        }

        res.json(user.rows[0]);

    } catch (err){
        res.status(500).json({ error: "Internal server error" });
    }
};