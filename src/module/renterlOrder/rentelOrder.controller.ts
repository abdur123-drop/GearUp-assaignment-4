import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { rentalOrderService } from "./rentelOrder.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status"

const createRental = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const payload = req.body;
    const userId =req.user?.id;
    const result = await rentalOrderService.createRentalIntoDB(payload, userId as string)

    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "Successfully Rental Order Confirmed",
        data: result
    })
})


const getMyRental = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const userId = req.user?.id;
    const result = await rentalOrderService.getMyRentalFromDB(userId as string)

    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "Successfully Rental Order Confirmed",
        data: result
    })
})

const getSingleRental = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const rentalId = req.params.id;
    const result = await rentalOrderService.getSingleRentalFromDB(rentalId as string)

    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "Successfully Rental Details Found",
        data: result
    })
})

const updateRentalStatus = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const userId = req.user?.id;
    const rentalId = req.params.id;
    const payload = req.body;
    const result = await rentalOrderService.updateRentalStatusIntoDB(userId as string, payload, rentalId as string)
    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "Successfully Rental Status Updated",
        data: result
    })
})

export const rentalOrderController = {
    createRental,
    getMyRental,
    getSingleRental,
    updateRentalStatus
}