import { Router } from 'express';
import {
  emailVerifyHandler,
  loginHandler,
  logoutHandler,
  refreshHandler,
  registerHandler,
  resetPasswordHandler,
  sendPasswordResetHandler,
} from '../controllers/auth.controller';

const router = Router();

router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.get('/refresh', refreshHandler);
router.get('/logout', logoutHandler);
router.get('/email/verify/:code', emailVerifyHandler);
router.post('/password/forgot', sendPasswordResetHandler);
router.post('/password/reset', resetPasswordHandler);

export default router;
