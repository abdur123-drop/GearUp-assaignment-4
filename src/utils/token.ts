import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const createToken = (payloader: JwtPayload, secrate: string, expireIn: SignOptions) =>{
    const token = jwt.sign(
        payloader,
        secrate,
        {
            expiresIn: expireIn
        } as SignOptions
    )

    return token
}


export const jwtUtils ={
    createToken
}