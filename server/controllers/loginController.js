import User from '../models/userModel.js';

export const loginController = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Convert username to lowercase before querying
        const user = await User.findOne({ username: username.toLowerCase() });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Check if password matches
        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid password" });
        }

        res.status(200).json({ message: "Login successful", username: user.username });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
