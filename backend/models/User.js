const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Please provide a full name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6,
        select: false // Don't return password by default
    },
    role: {
        type: String,
        enum: ['candidate', 'employer', 'admin'],
        default: 'candidate'
    },
    avatarUrl: String,
    profile: {
        title: { type: String, default: 'Professional' },
        bio: { type: String, default: '' },
        location: { type: String, default: 'Remote' },
        phoneNumber: { type: String, default: '' },
        skills: { type: [String], default: [] },
        resumeUrl: String,
        resumeName: String,
        website: String,
        linkedIn: String,
        twitter: String,
        github: String,
        experience: [{
            title: String,
            company: String,
            location: String,
            startDate: String,
            endDate: String,
            current: Boolean,
            description: String
        }],
        education: [{
            school: String,
            degree: String,
            field: String,
            startDate: String,
            endDate: String,
            description: String
        }]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isFlagged: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
