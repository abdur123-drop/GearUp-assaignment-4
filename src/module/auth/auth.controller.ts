import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from "http-status"
import { authService } from "./auth.service"
const createUser = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{

    const result = await authService.createUserIntoDB()

    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "Successfully User Create",
        data: result
    })
})

export const authController ={
    createUser
}