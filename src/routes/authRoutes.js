import { Router } from 'express'
import * as authController from '../controllers/authController.js'
import { validate } from '../middlewares/validateMiddleware.js'
import { registerSchema, loginSchema } from '../utils/authValidation.js'

const router = Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);

export default router;
