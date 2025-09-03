import db from '../config/database';

interface IUser {
    email: string;
    password: string;
    username: string;
    bio?: string;
    age?: number;
    profile_image?: string;
}

class UserModel {
    static create(
        user: IUser
    ) {
        const sentence = db.prepare(`
        INSERT INTO users (email, password_hash, username, bio, age, profile_image)
        VALUES (@email, @password, @username, @bio, @age, @profile_image) `
        );
        const result = sentence.run(user);
        return result.lastInsertRowid as number;
    }

    static findAll() {
        const sentence = db.prepare(`SELECT * FROM users`);
        return sentence.all();
    }

    static findById(id: number) {
        const sentence = db.prepare(`SELECT * FROM users WHERE id = ?`);
        return sentence.get(id);
    }

    static findByEmail(email: string) {
        const sentence = db.prepare(`SELECT * FROM users WHERE email = ?`);
        return sentence.get(email);
    }

    static delete(id: number) {
        const sentence = db.prepare(`DELETE FROM users WHERE id = ?`);
        return sentence.run(id);
    }
}

export default UserModel;
