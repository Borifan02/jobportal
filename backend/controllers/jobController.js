const Job = require('../models/Job');

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
exports.getJobs = async (req, res) => {
    try {
        // Query filters (search, location, type, category)
        let query = {};

        if (req.query.search) {
            query.title = { $regex: req.query.search, $options: 'i' };
        }

        if (req.query.location) {
            query.location = { $regex: req.query.location, $options: 'i' };
        }

        if (req.query.type && req.query.type !== 'All') {
            query.type = req.query.type;
        }

        if (req.query.category) {
            query.category = req.query.category;
        }

        // Only show non-flagged jobs to public
        if (req.user?.role !== 'admin') {
            query.isFlagged = false;
        }

        const jobs = await Job.find(query).sort({ postedAt: -1 });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (job) {
            res.json(job);
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a job
// @route   POST /api/jobs
// @access  Private (Employer/Admin)
exports.createJob = async (req, res) => {
    try {
        const { title, company, companyLogo, location, type, salary, description, requirements, isRemote, category } = req.body;

        const job = await Job.create({
            title,
            company,
            companyLogo,
            location,
            type,
            salary,
            description,
            requirements,
            isRemote,
            category,
            employer: req.user._id
        });

        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
// @access  Private (Employer/Admin)
exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (job) {
            // Check ownership
            if (job.employer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                return res.status(403).json({ message: 'User not authorized to delete this job' });
            }

            await job.deleteOne();
            res.json({ message: 'Job removed' });
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Toggle job verification
// @route   PATCH /api/jobs/:id/verify
// @access  Private (Admin)
exports.toggleVerification = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (job) {
            job.isVerified = !job.isVerified;
            await job.save();
            res.json(job);
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Toggle job flag
// @route   PATCH /api/jobs/:id/flag
// @access  Private (Admin)
exports.toggleFlag = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (job) {
            job.isFlagged = !job.isFlagged;
            await job.save();
            res.json(job);
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
