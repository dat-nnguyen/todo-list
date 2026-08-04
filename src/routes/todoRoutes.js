import { Router } from 'express';
import * as todoController from '../controllers/todoController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validateMiddleware.js';
import { createTodoSchema, updateTodoSchema } from '../utils/todoValidation.js';

const router = Router();

router.post('/', authenticate, validate(createTodoSchema), todoController.create);
router.get('/', authenticate, todoController.getAll);
router.get('/:id', authenticate, todoController.getById);
router.put('/:id', authenticate, validate(updateTodoSchema), todoController.update);
router.delete('/:id', authenticate, todoController.remove);

export default router;
