import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { gearService } from "./gear.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status"

const createGear = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const userId = req.user?.id;
    const payload = req.body;
    const result = await gearService.createGearIntoDB(payload, userId as string)

    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "Gear Created Sucessfully",
        data: result
    })
})

const getAllGear = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{

})

const getSingleGear = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{

})

const updateGear = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{

})

const deleteGear = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{

})


export const gearController = {
    createGear,
    getAllGear,
    getSingleGear,
    updateGear,
    deleteGear
}