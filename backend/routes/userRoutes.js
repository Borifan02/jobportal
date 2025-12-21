const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    deleteUser,
    updateUserRole,
    toggleUserVerification,
    toggleUserFlag,
    updateOwnRole
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', protect, admin, getAllUsers);
router.patch('/me/role', protect, updateOwnRole); // Users can update their own role
router.delete('/:id', protect, admin, deleteUser);
router.patch('/:id/role', protect, admin, updateUserRole);
router.patch('/:id/verify', protect, admin, toggleUserVerification);
router.patch('/:id/flag', protect, admin, toggleUserFlag);

module.exports = router;
