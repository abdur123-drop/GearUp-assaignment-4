import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { reviewService } from "./review.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status"
const createReview = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const userId = req.user?.id;
    const payload = req.body;
    const result = await reviewService.createReviewIntoDB(userId as string, payload)

    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "Successfully Create Review",
        data: result
    })
})


export const reviewController = {
    createReview
}


