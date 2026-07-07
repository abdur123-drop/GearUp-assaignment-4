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
    const query = req.query;
    const result = await gearService.getAllGearFromDB(query)

    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message:"All Gear Found",
        data: result.data,
        meta: result.meta
    })
})

const getSingleGear = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const gearId = req.params.id;
    const result = await gearService.getSingleGearFromDB(gearId as string)

    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "Successfully found single gear",
        data: result
    })
})

const updateGear = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const gearId = req.params.id;
    const payload = req.body;
    const userId = req.user?.id
    const result = await gearService.updateGearIntoDB(payload, gearId as string, userId as string)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Gear Updated Successfully",
        data: result
    })
})

const deleteGear = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const userId = req.user?.id;
    const gearId = req.params.id;
    await gearService.deleteGearFromDB(gearId as string, userId as string)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Sucessfully Deleted Gear",
        data: null
    })
})


export const gearController = {
    createGear,
    getAllGear,
    getSingleGear,
    updateGear,
    deleteGear
}