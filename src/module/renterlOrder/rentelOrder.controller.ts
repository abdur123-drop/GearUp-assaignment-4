import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";

const createRental = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{

})


export const rentalOrderController = {
    createRental
}