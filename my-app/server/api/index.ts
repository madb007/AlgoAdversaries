import express from 'express';
import { authMiddleware } from '../auth/middleware';
import * as loginHandler from '../auth/routes/login';
import * as logoutHandler from '../auth/routes/logout';
import * as registerHandler from '../auth/routes/register';

const router = express.Router();

router.post('/auth/login', loginHandler.POST);
router.post('/auth/logout', logoutHandler.POST);
router.post('/auth/register', registerHandler.POST);

router.use('/problem', authMiddleware);
router.use('/home', authMiddleware);

export { router };
