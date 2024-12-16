import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            minlength: 3,
            maxlength: 20,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+\@.+\..+/, "Please provide a valid email"], // Regex for email validation
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
    },
    { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

const User = mongoose.model('User', userSchema);

export default User;
