import { z } from "zod";


const createReviewValidationSchema = z.object({
    body:z.object({

        rentalOrderId:z
        .string({
            error:"Rental order ID is required"
        })
        .uuid(
            "Invalid rental order ID"
        ),

        rating:z
        .coerce
        .number({
            error:"Rating is required"
        })
        .int(
            "Rating must be an integer"
        )
        .min(
            1,
            "Rating must be at least 1"
        )
        .max(
            5,
            "Rating cannot be more than 5"
        ),

        comment:z
        .string({
            error:"Comment must be a string"
        })
        .min(
            5,
            "Comment must be at least 5 characters"
        )
        .optional()
    })

});


export const reviewValidation = {
    createReviewValidationSchema
}