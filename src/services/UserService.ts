import bcrypt from 'bcryptjs';
import UserModel from '../models/UserModel';
import { CreateUserDTO, UserResponseDTO } from '../dtos/userDto';

class UserService {
    static createUser(data: CreateUserDTO): UserResponseDTO {
        if (!data.email || !data.password || !data.username) {
            throw new Error('Email, password y username son requeridos');
        }

        const existing = UserModel.findByEmail(data.email);
        if (existing) {
            throw new Error('El email ya está registrado');
        }

        const password = bcrypt.hashSync(data.password, 10);

        const id = UserModel.create({
            email: data.email,
            password,
            username: data.username,
            bio: data.bio,
            age: data.age,
            profile_image: data.profile_image,
        });

        const user = UserModel.findById(id);

        return this.toResponseDTO(user);
    }

    static getAllUsers(): UserResponseDTO[] {
        const users = UserModel.findAll();
        return users.map(this.toResponseDTO);
    }

    static getUserById(id: number): UserResponseDTO {
        const user = UserModel.findById(id);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return this.toResponseDTO(user);
    }

    static deleteUser(id: number): { message: string } {
        const user = UserModel.findById(id);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        UserModel.delete(id);
        return { message: 'Usuario eliminado correctamente' };
    }

    private static toResponseDTO(user: any): UserResponseDTO {
        return {
            id: user.id,
            email: user.email,
            username: user.username,
            bio: user.bio,
            age: user.age,
            profile_image: user.profile_image,
            created_at: user.created_at,
        };
    }
}

export default UserService;
