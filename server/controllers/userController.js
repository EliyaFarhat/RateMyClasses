import User from '../models/userModel.js';

export const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if all fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Validate TMU email domain
        const tmuEmailRegex = /^[a-zA-Z0-9._%+-]+@torontomu\.ca$/;
        if (!tmuEmailRegex.test(email)) {
            return res.status(400).json({ message: 'Only TMU students can sign up with a @torontomu.ca email address' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already in use' });
        }

        // Create a new user
        const newUser = new User({ 
            username: username.toLowerCase(),
            email, 
            password });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: { id: newUser._id, username: newUser.username, email: newUser.email } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
