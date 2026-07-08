import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { adminService } from "./admin.service"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from "http-status"
const getAllUser = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const result = await adminService.getAllUserFromDB()

    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "Found All User From DB",
        data: result
    })
})

const updateUserStatus = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const status = req.body.status;
    const userId = req.params.id;
    const result = await adminService.updateUserStatusIntoDB(status, userId as string)

    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "Successfully Change User Status",
        data: result
    })
})

const getAllGear = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const result = await adminService.getAllGearFromDB()

    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "Found All Gear From DB",
        data: result
    })
})

const getAllRental = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const result = await adminService.getAllRentalFromDB()

    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "Found All Rental From DB",
        data: result
    })
})


export const adminController = {
    getAllUser,
    updateUserStatus,
    getAllGear,
    getAllRental
}