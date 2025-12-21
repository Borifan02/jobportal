const Application = require('../models/Application');
const Job = require('../models/Job');

// @desc    Submit an application
// @route   POST /api/applications
// @access  Private (Candidate)
exports.submitApplication = async (req, res) => {
    try {
        const { jobId, coverLetter, resumeUrl } = req.body;

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Check if already applied
        const alreadyApplied = await Application.findOne({
            job: jobId,
            candidate: req.user._id
        });

        if (alreadyApplied) {
            return res.status(400).json({ message: 'You have already applied for this job' });
        }

        const application = await Application.create({
            job: jobId,
            candidate: req.user._id,
            employer: job.employer,
            coverLetter,
            resumeUrl
        });

        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user's applications
// @route   GET /api/applications/my
// @access  Private (Candidate)
exports.getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({ candidate: req.user._id })
            .populate('job', 'title company location type salary')
            .sort({ appliedAt: -1 });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get applications for employer's jobs
// @route   GET /api/applications/employer
// @access  Private (Employer)
exports.getEmployerApplications = async (req, res) => {
    try {
        const applications = await Application.find({ employer: req.user._id })
            .populate('job', 'title')
            .populate('candidate', 'fullName email avatarUrl')
            .sort({ appliedAt: -1 });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update application status
// @route   PATCH /api/applications/:id/status
// @access  Private (Employer)
exports.updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const application = await Application.findById(req.params.id);

        if (application) {
            // Check ownership (employer of the job)
            if (application.employer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Not authorized to update this application' });
            }

            application.status = status;
            await application.save();
            res.json(application);
        } else {
            res.status(404).json({ message: 'Application not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
