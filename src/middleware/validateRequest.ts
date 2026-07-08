import { NextFunction, Request, Response } from "express";


export const validateRequest = (schema:any)=>{
    return async(req:Request, res:Response, next:NextFunction)=>{
        try{
            await schema.parseAsync({
                body: req.body
            })
    next();
}catch(error){
    next(error);
}


    }

}