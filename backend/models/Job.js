const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a job title'],
        trim: true
    },
    company: {
        type: String,
        required: [true, 'Please provide a company name'],
        trim: true
    },
    companyLogo: String,
    location: {
        type: String,
        required: [true, 'Please provide a location']
    },
    type: {
        type: String,
        required: [true, 'Please provide a job type'],
        enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote']
    },
    salary: {
        type: String,
        required: [true, 'Please provide a salary range']
    },
    description: {
        type: String,
        required: [true, 'Please provide a job description']
    },
    requirements: [String],
    isRemote: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        required: [true, 'Please provide a category']
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isFlagged: {
        type: Boolean,
        default: false
    },
    employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Job', JobSchema);
