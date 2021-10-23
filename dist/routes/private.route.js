import express from 'express';
import { saveUser } from '../controllers/users.controller.js';
const router = express.Router();
router.post('/users', saveUser);
export default router;
