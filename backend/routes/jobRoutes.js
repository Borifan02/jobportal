const express = require('express');
const router = express.Router();
const {
    getJobs,
    getJobById,
    createJob,
    deleteJob,
    toggleVerification,
    toggleFlag
} = require('../controllers/jobController');
const { protect, employer, admin } = require('../middleware/authMiddleware');

router.get('/', getJobs);
router.get('/:id', getJobById);
router.post('/', protect, employer, createJob);
router.delete('/:id', protect, deleteJob);

// Admin moderation
router.patch('/:id/verify', protect, admin, toggleVerification);
router.patch('/:id/flag', protect, admin, toggleFlag);

module.exports = router;
