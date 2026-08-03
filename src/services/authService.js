import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/db.js";

export const registerUser = async ({email, password, name}) => {
    // check if user is already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
        error.statusCode = 400;
        throw new Error('User already exists');
    }

    // hashing password 
    const hashedPassword = await bcrypt.hash(password, 10);

    // save user to db
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword, name,
        }, 
        select: {
            id: true, 
            email: true, 
            name: true,
            createdAt: true,
        },
    });

    return user;
}


export const loginUser = async ({email, password}) => {
    // find user by email

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        error.statusCode = 401;
        throw new Error('Invalid mail or password')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        error.statusCode = 401;
        throw new Error('Invalid mail or password');
    }
    //generate JWT token
    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || 'fallback_secret',
        { expiresIn: '1d' }
    );

    return {
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
        },
        token,
    };
};

