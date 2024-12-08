import express from 'express';
import { csrfProtection, getCsrfToken } from '../middlewares/csrfMiddleware.js';

const router = express.Router();

// Route to get CSRF token
router.get('/csrf-token', csrfProtection, getCsrfToken);

export default router;