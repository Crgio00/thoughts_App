import { Request, Response } from 'express';
import UserService from '../services/UserService';

export const getUsers = (req: Request, res: Response) => {
    try {
        const users = UserService.getAllUsers();
        res.json(users);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserById = (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const user = UserService.getUserById(id);
        res.json(user);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

export const createUser = (req: Request, res: Response) => {
    try {
        const newUser = UserService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteUser = (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const result = UserService.deleteUser(id);
        res.json(result);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};
