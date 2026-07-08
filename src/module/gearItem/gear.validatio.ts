import { z } from "zod";


const createGearValidationSchema = z.object({
    body:z.object({
    name:z
.string({
    error:"Gear name is required"
})
.min(
    2,
    "Gear name must be at least 2 characters"
),


description:z
.string({
    error:"Description is required"
})
.min(
    10,
    "Description must be at least 10 characters"
),



pricePerDay:z
.number({
    error:"Price per day is required"
})
.positive(
    "Price per day must be greater than 0"
),


stock:z
.number({
    error:"Stock is required"
})
.int(
    "Stock must be integer"
)
.positive(
    "Stock must be greater than 0"
),


availableStock:z
.number({
    error:"Available stock is required"
})
.int()
.nonnegative(
    "Available stock cannot be negative"
),


condition:z.enum(
[
"NEW",
"EXCELLENT",
"GOOD",
"FAIR",
"POOR"
],
{
error:"Condition is required"
}
),


categoryId:z
.string({
    error:"Category ID is required"
})


})

});


const updateGearValidationSchema = z.object({

    body:z.object({

        name:z
        .string({
            error:"Gear name must be string"
        })
        .min(
            2,
            "Gear name must be at least 2 characters"
        )
        .optional(),


        description:z
        .string({
            error:"Description must be string"
        })
        .min(
            10,
            "Description must be at least 10 characters"
        )
        .optional(),



        pricePerDay:z
        .coerce
        .number({
            error:"Price per day must be a number"
        })
        .positive(
            "Price per day must be greater than 0"
        )
        .optional(),



        stock:z
        .coerce
        .number({
            error:"Stock must be a number"
        })
        .int(
            "Stock must be an integer"
        )
        .positive(
            "Stock must be greater than 0"
        )
        .optional(),



        availableStock:z
        .coerce
        .number({
            error:"Available stock must be a number"
        })
        .int(
            "Available stock must be an integer"
        )
        .nonnegative(
            "Available stock cannot be negative"
        )
        .optional(),



        condition:z
        .enum(
            [
                "NEW",
                "EXCELLENT",
                "GOOD",
                "FAIR",
                "POOR"
            ],
            {
                error:"Invalid gear condition"
            }
        )
        .optional(),



        categoryId:z
        .string({
            error:"Category ID must be string"
        })
        .optional()


    })

});

export const gearValidation = {
createGearValidationSchema,
updateGearValidationSchema
}