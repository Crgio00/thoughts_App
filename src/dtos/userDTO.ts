export interface CreateUserDTO {
    email: string;
    password: string;
    username: string;
    bio?: string;
    age?: number;
    profile_image?: string;
}

export interface UserResponseDTO {
    id: number;
    email: string;
    username: string;
    bio?: string;
    age?: number;
    profile_image?: string;
    created_at: string;
}
