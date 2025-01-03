import express from 'express';
const router = express.Router();
import { loginController } from '../controllers/loginController.js';


router.post('/login', loginController);

router.get('/', (req, res) => {
    res.send('Users endpoint is working!');
});

export default router;
