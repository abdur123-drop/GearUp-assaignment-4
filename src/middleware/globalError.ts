import { NextFunction, Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client";
import httpStatus from "http-status";
import { ZodError } from "zod";


export const globalErrorHandling = (
err:any,
req:Request,
res:Response,
next:NextFunction
)=>{


let statusCode:number = httpStatus.INTERNAL_SERVER_ERROR;

let errMessage =
err.message || "Internal Server Error";

let errorDetails:any[] = [];



if(err instanceof ZodError){

    statusCode = httpStatus.BAD_REQUEST;

    errMessage = "Validation failed";


    errorDetails =
    err.issues.map(issue=>({

        field: issue.path[1] || issue.path[0],

        message: issue.message

    }));



}



else if(
err instanceof Prisma.PrismaClientValidationError
){

    statusCode = httpStatus.BAD_REQUEST;

    errMessage =
    "You have provided incorrect field type or missing fields";


}



else if(
err instanceof Prisma.PrismaClientKnownRequestError
){


    if(err.code === "P2002"){

        statusCode = httpStatus.BAD_REQUEST;

        errMessage =
        "Duplicate key error";

    }


    else if(err.code === "P2023"){

        statusCode = httpStatus.BAD_REQUEST;

        errMessage =
        "Foreign key constraint failed";

    }


    else if(err.code === "P2025"){

        statusCode = httpStatus.NOT_FOUND;

        errMessage =
        "Record not found";

    }

}



else if(
err instanceof Prisma.PrismaClientInitializationError
){


    if(err.errorCode === "P1000"){

        statusCode = httpStatus.UNAUTHORIZED;

        errMessage =
        "Database authentication failed";

    }


    else if(err.errorCode === "P1001"){

        statusCode = httpStatus.BAD_REQUEST;

        errMessage =
        "Cannot reach database server";

    }


}



else if(
err instanceof Prisma.PrismaClientUnknownRequestError
){

    statusCode =
    httpStatus.INTERNAL_SERVER_ERROR;

    errMessage =
    "Error occurred during query execution";

}




res.status(statusCode).json({

    success:false,

    statusCode,
    name: err.name,
    message:errMessage,
    errorDetails,
    error:err.stack

});


}