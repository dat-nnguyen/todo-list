import prisma from '../config/db.js';

export const createTodo = async (userId, { title, description }) => {
    return await prisma.todo.create({
        data: {
            title, 
            description,
            userId,
        },
    });
};

export const getTodo = async (userId, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const [todos, total] = await Promise.all([
        prisma.todo.findMany({
            where: { userId },
            skip: Number(skip),
            take: Number(limit),
            orderBy: {createdAt: 'desc'},
        }),
        prisma.todo.count({ where : { userId }}),
    ]);

    return {
        todos,
        pagination: {
            total, 
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / Number(limit)),
        },
    };
};

export const getTodoById = async (todoId, userId) => {
    const todo = await prisma.todo.findUnique({
        where: { id: todoId}, 
    });

    if (!todo) {
        const error = new Error('Todo not found');
        error.statusCode = 404;
        throw error;
    }

    if (todo.userId !== userId) {
        const error = new Error('Forbidden');
        error.statusCode = 403;
        throw error;
    }

    return todo;
}

export const updateTodo = async (todoId, userId, updateData) => {
    // check existence & ownership first
    await getTodoById(todoId, userId);

    return await prisma.todo.update({
        where: { id: todoId },
        data: updateData,
    });
}

export const deleteTodo = async (todoId, userId) => {
    await getTodoById(todoId, userId);

    await prisma.todo.delete({
        where: { id: todoId },
    });

    return { message: 'Deleted successfully'};
}