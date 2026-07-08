import bcrypt from "bcrypt"
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { ICREATEUSER, ILOGIN } from "./auth.interface";
import { jwtUtils } from "../../utils/token";
import { SignOptions } from "jsonwebtoken";



const createUserIntoDB = async(payload : ICREATEUSER) =>{
    const {name, email, password, role} = payload;

    if(!name){
        throw new Error("Name is required");
    }

    if(name.length < 2){
        throw new Error("Name At Least 2 Character Needed")
    }

    if(!email){
        throw new Error("Email is required");
    }

    if(!email.includes("@")){
        throw new Error("Invalid Email")
    }

    if(!password){
        throw new Error("Password is Required")
    }

    if(password.length < 6){
    throw new Error("Password must be at least 6 characters");
    }

    const userFind = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if(userFind){
        throw new Error("User With This Email Already Exists")
    }

    if(!["CUSTOMER", "PROVIDER"].includes(role)){
        throw new Error("Invalid Role")
    }

    const hashPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_round))
    
    const createUser = await prisma.user.create({
        data:{
            name,
            email,
            password: hashPassword,
            role
        }
    })

    const user = await prisma.user.findUnique({
        where:{
            id: createUser.id,
            email: createUser.email || email
        },
        omit: {
            password: true
        }
    })
    return user
}

const logInFromDB = async(payload: ILOGIN)=>{
    const {email, password} = payload;

    if(!email){
        throw new Error("Email is required");
    }

    if(!email.includes("@")){
        throw new Error("Invalid Email")
    }

    if(!password){
        throw new Error("Password is Required")
    }

    const user = await prisma.user.findUniqueOrThrow({
        where:{
            email
        }
    })

    const isMatchPassword = await bcrypt.compare(password, user.password)
    if(!isMatchPassword){
        throw new Error("Password did not Match")
    }

    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }

    const accessToken = jwtUtils.createToken(jwtPayload, config.jwt_access_token_secret as string, config.jwt_access_token_expires_in as SignOptions)
    return {
        accessToken
    }
}

const currentUserFromDB = async(email: string) =>{
    const user = await prisma.user.findFirstOrThrow({
        where:{
            email
        },
        omit:{
            password: true
        }
    })

    return user
}

export const authService = {
    createUserIntoDB,
    logInFromDB,
    currentUserFromDB
}