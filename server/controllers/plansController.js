
export const getPlans = async (req, res) => {
    try{
        const result = await query('SELECT * FROM plans ORDER BY price ASC');

        res.json(result.rows)

    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
};