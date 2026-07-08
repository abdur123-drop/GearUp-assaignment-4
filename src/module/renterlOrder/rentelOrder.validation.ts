import { z } from "zod";
import { OrderStatus } from "../../../generated/prisma/enums";


const createRentalValidationSchema = z.object({

    body:z.object({

        gearItemId:z
        .string({
            error:"Gear item ID is required"
        })
        .uuid(
            "Invalid gear item ID"
        ),

        quantity:z
        .coerce
        .number({
            error:"Quantity is required"
        })
        .int(
            "Quantity must be an integer"
        )
        .positive(
            "Quantity must be greater than 0"
        ),

        startDate:z
        .string({
            error:"Start date is required"
        })
        .refine(
            (date)=>!isNaN(Date.parse(date)),
            {
                message:"Invalid start date format"
            }
        ),

        endDate:z
        .string({
            error:"End date is required"
        })
        .refine(
            (date)=>!isNaN(Date.parse(date)),
            {
                message:"Invalid end date format"
            }
        )

    })
    

});

const updateRentalStatusValidationSchema = z.object({

    body:z.object({

        status:z.enum(OrderStatus,
            {
                error:"Invalid rental status"
            }
        )

    })

});



export const rentalValidation = {
    createRentalValidationSchema,
    updateRentalStatusValidationSchema
}