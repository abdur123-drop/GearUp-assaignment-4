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

const verifyToken = (accessToken: string, secrate: string)=>{
    try {
        const userFound = jwt.verify(accessToken, secrate)
        return {
            success: true,
            data: userFound
        }
    } catch (error: any) {
        return {
            success: false,
            error: error.message
        }
    }
}

export const jwtUtils ={
    createToken,
    verifyToken
}