import User from '../models/userModel.js';

export const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate that all fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already in use' });
        }

        // Create a new user
        const newUser = new User({ username, email, password });
        await newUser.save(); // This triggers the `pre('save')` middleware to hash the password

        // Respond with success
        res.status(201).json({ message: 'User created successfully', user: { id: newUser._id, username: newUser.username, email: newUser.email } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
