import jwt, {JwtPayload} from 'jsonwebtoken';
import {Request, Response, NextFunction} from "express";
import { CustomJwtPayload } from './types/jwt';

declare module "express-serve-static-core" {
  interface Request {
    user?: CustomJwtPayload;
  }
}

const authMiddleware = (req: Request,res: Response,next: NextFunction)=>{
  const authHeader = req.headers["authorization"];

  if(!authHeader) return res.status(401).json({message:"No token provided"});

  let token = authHeader.split(" ")[1];
  token = token.replace(/,$/, "");
 
  if(!token)
    return res.status(401).json({message:"Token is missing"});

  try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET as string)  as CustomJwtPayload;
    req.user = decoded;
    next();

  }
  catch(error){
    return res.status(401).json({message:"Invalid or expired token",error,token});
  }
}

export default authMiddleware;
