import { Router } from 'express';
const router = Router();
import * as authController from '../controllers/auth.controller';

router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.post('/verify', authController.verify);

module.exports = router;