import { User } from '../models/User';
import { hash, compare } from 'bcrypt';
import { config } from '../config/config';

export async function register(email: string, password: string) {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error('A user with the same email already exists');
    }

    const user = new User({
        email,
        password: hash(password, config.salt_rounds),
    });

    user.save();

    return user;
}

export async function login(email: string, password: string) {
    const existingUser = await User.findOne({ email });

    const error = new Error('Username or password do not match');

    if (!existingUser) {
        throw error;
    }

    const match = compare(password, existingUser.password);

    if (!match) {
        throw error;
    }

    return existingUser;
}
