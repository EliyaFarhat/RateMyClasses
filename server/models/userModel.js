import mongoose from 'mongoose';
import bcrypt from 'bcrypt'; // To hash passwords

const userSchema = new mongoose.Schema({
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
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

// Hash the password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Only hash if the password is new
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', userSchema);

export default User;
