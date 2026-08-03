// handle imcoming requests, calls services, and formats JSON responses
import * as authService from '../services/authService.js';

// Register a new user
export const register = async (req, res, next) => {
    try {
        const user = await authService.registerUser(req.body);
        res.status(201).json({
            message: 'User registerd successfully',
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const loginResult = await authService.loginUser(req.body);
        res.status(200).json({
            message: 'Login successful',
            data: loginResult,
        });
    } catch (error) {
        next(error);
    }
};