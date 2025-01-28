import jwt from 'jsonwebtoken';
import { config } from '../config/config';

interface UserData {
    _id: string;
    email: string;
    password: string;
}

class TokenService {
    create(userData: UserData): string {
        const payload = {
            _id: userData._id,
            email: userData.email,
        };

        const token = jwt.sign(payload, config.secret, { expiresIn: '12h' });
        return token;
    }
    verify(token: string) {
        const payload = jwt.verify(token, config.secret);
        return payload;
    }
}

export default new TokenService();
