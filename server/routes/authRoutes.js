import express from 'express';
import { createUser } from '../controllers/userController.js';

const router = express.Router();

// Add GET route for testing
router.get('/', (req, res) => {
    res.send('Users endpoint is working!');
});

router.post('/', createUser); // POST for creating a user

export default router;