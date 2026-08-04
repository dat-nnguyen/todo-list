import * as todoService from '../services/todoService.js';

export const create = async (req, res, next) => {
    try {
        const todo = await todoService.createTodo(req.user.userId, req.body);
        res.status(201).json({ message: 'Todo created succesfully', data: todo });
    } catch (error) {
        next(error);
    }
};

export const getAll = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const result = await todoService.getTodo(req.user.userId, page, limit);
        res.status(200).json({
            message: 'Get All Todo', 
            data: result.todos,
            pagination: result.pagination,
        });
    } catch (error) {
        next(error);
    }
}

export const getById = async (req, res, next) => {
    try {
        const todo = await todoService.getTodoById(req.params.id, req.user.userId);
        res.status(200).json({ message: 'Get Todo by ID', data: todo });
    } catch (error) {
        next(error);
    }
}

export const update = async (req, res, next) => {
    try {
        const todo = await todoService.updateTodo(req.params.id, req.user.userId, req.body);
        res.status(200).json({ message: 'Todo updated successfully', data: todo });
    } catch (error) {
        next(error);
    }
}

export const remove = async (req, res, next) => {
    try {
        const result = await todoService.deleteTodo(req.params.id, req.user.userId);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}