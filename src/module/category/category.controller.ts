import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { categoryService } from "./category.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status"

// complete createCategory
const createCategory = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const payload = req.body;
    const result = await categoryService.createCategoryIntoDB(payload)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Category Create Successfully",
        data: result
    })
})

// complete getAllCategories
const getAllCategories = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    const result = await categoryService.getAllCategoriesFromDB()

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Successfully Retrive All Category",
        data: result
    })
})

// complete getSingleCategory
const getSingleCategory = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    const categoryId = req.params.id;
    const result = await categoryService.getSingleCategoryFromDB(categoryId as string)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Successfully Retrive Single Category",
        data: result
    })
})


// complete updateCategory
const updateCategory = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    const categoryId = req.params.id;
    const payload = req.body;

    const result = await categoryService.updateCategoryIntoDB(payload, categoryId as string)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Successfully Updated Category",
        data: result
    })
})

// complete deleteCategory
const deleteCategory = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    const categoryId = req.params.id;
    await categoryService.deleteCategoryFromDB(categoryId as string)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Category Deleted Successfully",
        data: null
    })
})


export const categoryCotroller = {
    createCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory
}