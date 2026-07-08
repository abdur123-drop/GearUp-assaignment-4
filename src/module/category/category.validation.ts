import {z} from "zod";

const createCategoryValidationSchema = z.object({
    body:z.object({
        name:z.string({
            error:"Category Name must be string"
        })
        .min(2, "category name must be at least 2 character"),

        description:z.string({
            error:"Category Description must be string"
        })
        .min(10, "Category Description must be at least 10 character").optional()
    })
})

const updateCategoryValidationSchema = z.object({
    body:z.object({
        name:z.string({
            error:"Category Name must be string"
        })
        .min(2, "category name must be at least 2 character").optional(),

        description:z.string({
            error:"Category Description must be string"
        })
        .min(10, "Category Description must be at least 10 character").optional()
    })
})


export const categoryValidation = {
    createCategoryValidationSchema,
    updateCategoryValidationSchema
}