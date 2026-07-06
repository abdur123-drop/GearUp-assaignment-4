import { NextFunction, Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client";
import httpStatus from "http-status"
export const globalErrorHandling = (err: any, req: Request, res: Response, next: NextFunction) =>{
        let statusCode;
        let errMessage = err.message || "Internal Server Error";
        let errName = err.name || "Internal Server Error"

        if(err instanceof Prisma.PrismaClientValidationError){
            statusCode = httpStatus.BAD_REQUEST;
            errMessage = "You have provided incorrect field type or missing fields"
        } else if(err instanceof Prisma.PrismaClientKnownRequestError){
            if(err.code === "P2002"){
                statusCode = httpStatus.BAD_REQUEST;
                errMessage = "Duplicate Key Error"
            } else if(err.code === "P2023"){
                statusCode = httpStatus.BAD_REQUEST;
                errMessage = "Foreign Key Constraint Faild"
            } else if(err.code = "P2025"){
                statusCode = httpStatus.BAD_REQUEST;
                errMessage = "An Operation Failed because It depends on one or more records that were required but not found"
            }
        } else if(err instanceof Prisma.PrismaClientInitializationError){
             if(err.errorCode === "P1000"){
            statusCode = httpStatus.UNAUTHORIZED;
            errMessage = "Authentication failed against database server. Please Check Your Credentials"
       }else if(err.errorCode === "P1001"){
            statusCode = httpStatus.BAD_REQUEST;
            errMessage = "Can't reach database server"
        }
    } else if(err instanceof Prisma.PrismaClientUnknownRequestError){
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        errMessage = "Error occurred during query execution"
    }


    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        statusCode: statusCode || httpStatus.INTERNAL_SERVER_ERROR,
        name: errName,
        message: errMessage,
        error: err.stack
    })
}