import { z } from "zod";


const createPaymentValidationSchema = z.object({

    body:z.object({

        rentalOrderId:z
        .string({
            error:"Rental order ID is required"
        })
        .uuid(
            "Invalid rental order ID"
        )

    })

});

const confirmPaymentValidationSchema = z.object({

    body:z.object({

        sessionId:z
        .string({
            error:"Session ID is required"
        })
        .min(
            10,
            "Invalid session ID"
        )

    })

});

export const paymentValidation = {
    createPaymentValidationSchema,
    confirmPaymentValidationSchema
}