import { User } from '../utils/typeorm';
import { PayloadgenerateToken, ValidateUserDetails } from '../utils/types';

export interface IAuthService {
  validateUser(userCredentials: ValidateUserDetails): Promise<User | null>;
  generateToken(userId: PayloadgenerateToken): Promise<any>;
  validateToken(token: string): Promise<any>;
}
