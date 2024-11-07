import express from 'express';
import userAuthController from '../controllers/userAuthController.js';
import { validate } from '../validate.js';

const router = express.Router();

router.post('/register', validate('register'), userAuthController.register);

router.post('/login', validate('login'), userAuthController.login);

router.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        message: "Server is healthy"
    });
});

export default router;