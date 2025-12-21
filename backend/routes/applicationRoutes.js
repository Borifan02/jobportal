const express = require('express');
const router = express.Router();
const {
    submitApplication,
    getMyApplications,
    getEmployerApplications,
    updateStatus
} = require('../controllers/applicationController');
const { protect, employer } = require('../middleware/authMiddleware');

router.post('/', protect, submitApplication);
router.get('/my', protect, getMyApplications);
router.get('/employer', protect, employer, getEmployerApplications);
router.patch('/:id/status', protect, updateStatus);

module.exports = router;
