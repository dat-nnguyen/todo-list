import { Router } from 'express';
import * as todoController from '../controllers/todoController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validateMiddleware.js';
import { createTodoSchema, updateTodoSchema } from '../utils/todoValidation.js';

const router = Router();
router.use(authenticate);
/**
 * @openapi
 * /api/todos:
 *   post:
 *     summary: Create a new todo item
 *     tags:
 *       - Todos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Complete OpenAPI Setup
 *               description:
 *                 type: string
 *                 example: Add Swagger documentation to Express server
 *     responses:
 *       201:
 *         description: Todo created successfully
 *       401:
 *         description: Unauthorized
 * 
 *   get:
 *     summary: Retrieve user's todos with pagination
 *     tags:
 *       - Todos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of todos with pagination metadata
 *       401:
 *         description: Unauthorized
 */
router.post('/', validate(createTodoSchema), todoController.create);
router.get('/', todoController.getAll);
/**
 * @openapi
 * /api/todos/{id}:
 *   get:
 *     summary: Get a specific todo by ID
 *     tags:
 *       - Todos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo UUID
 *     responses:
 *       200:
 *         description: Todo details found
 *       403:
 *         description: Forbidden (Not the owner)
 *       404:
 *         description: Todo not found
 * 
 *   put:
 *     summary: Update an existing todo
 *     tags:
 *       - Todos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               isCompleted:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *       403:
 *         description: Forbidden
 * 
 *   delete:
 *     summary: Delete a todo item
 *     tags:
 *       - Todos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *       403:
 *         description: Forbidden
 */
router.get('/:id', todoController.getById);
router.put('/:id', validate(updateTodoSchema), todoController.update);
router.delete('/:id', todoController.remove);

export default router;

