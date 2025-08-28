import jwt from 'jsonwebtoken';
export interface CustomJwtPayload extends jwt.JwtPayload {
  id: string;
}