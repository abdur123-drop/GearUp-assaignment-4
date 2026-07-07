import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { paymentService } from "./payment.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status"

const createPayment = catchAsync(async(req: Request, res: Response)=>{
    const userId = req.user?.id;
    const rentalOrderId = req.body.rentalOrderId
    const result = await paymentService.createPaymentIntoDB(userId as string, rentalOrderId as string)

    sendResponse(res,{
success:true,
statusCode:httpStatus.OK,
message:"Checkout created",
data:result
});
})

const confirmPayment = catchAsync(async(req: Request, res: Response)=>{
    const result = await paymentService.confirmPaymentIntoDB(req.body.sessionId as string)

    sendResponse(res,{
success:true,
statusCode:httpStatus.OK,
message:"Successfully Payment Confirmed",
data:result
});
})

const userPaymentHistory = catchAsync(async(req: Request, res: Response)=>{
    const userId = req.user?.id;
    const result = await paymentService.usersPaymentHistoryFromDB(userId as string)

    sendResponse(res,{
success:true,
statusCode:httpStatus.OK,
message:"Successfully Users Payment History Found",
data:result
});
})

const paymentDetails = catchAsync(async(req: Request, res: Response)=>{
    const userId = req.user?.id;
    const paymentId = req.params.id;
    const result = await paymentService.paymentDetailsFromDB(userId as string, paymentId as string)

    sendResponse(res,{
success:true,
statusCode:httpStatus.OK,
message:"Successfully Payment History Details Found",
data:result
});
})

export const paymentController = {
    createPayment,
    confirmPayment,
    userPaymentHistory,
    paymentDetails
}