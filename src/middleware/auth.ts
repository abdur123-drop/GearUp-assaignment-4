import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { jwtUtils } from "../utils/token";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import { Role } from "../../generated/prisma/enums";
import { prisma } from "../lib/prisma";

declare global{
    namespace Express{
        interface Request{
            user?:{
                name: string,
                email: string,
                id: string,
                role: Role
            }
        }
    }
}

export const auth = (...RequiredRoles: Role[])=>{
    return catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const token = req.cookies.accessToken 
                     ?
                    req.cookies.accessToken 
                     :
                    req.headers.authorization?.startsWith("Bearer ") 
                     ?
                    req.headers.authorization.split(" ")[1] 
                     :
                    req.headers.authorization;
    if(!token){
        throw new Error("You are Not Logged IN. Please Log In to Access This Resource")
    }

    const verifyToken = jwtUtils.verifyToken(token, config.jwt_access_token_secret as string)
    console.log(verifyToken.data);
    const {id, name, email, role} = verifyToken.data as JwtPayload;
    if(!verifyToken.success){
        throw new Error(verifyToken.error)
    }

    if(RequiredRoles.length && !RequiredRoles.includes(role)){
        throw new Error("Forbidden! You don't have permission to access this resource")
    }

    const user = await prisma.user.findUnique({
        where:{
            email,
            id,
            role
        }
    })

    if(!user){
        throw new Error("User not found. Please log in again")
    }

    if(user.status === "SUSPENDED"){
        throw new Error("Your Account Has Been Suspended. Please Contact Support.")
    }

    req.user = {
        id,
        name,
        email,
        role
    }
    next()
})
}