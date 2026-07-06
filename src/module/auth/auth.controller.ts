import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from "http-status"
import { authService } from "./auth.service"

const createUser = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const payload = req.body;
    const result = await authService.createUserIntoDB(payload)

    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "Successfully User Create",
        data: result
    })
})

const logIn = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const payload = req.body;
    const {accessToken} = await authService.logInFromDB(payload)

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24
    })

    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "Successfully User LogIn",
        data: {
            accessToken
        }
    })
})

export const authController ={
    createUser,
    logIn
}