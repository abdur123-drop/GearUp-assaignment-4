import { z } from "zod";


// Register

const registerValidationSchema = z.object({
    body:z.object({
        name:z
        .string({
            error:"Name is required"
        })
        .min(
            2,
            "Name must be at least 2 characters"
        ),

        email:z
        .string({
            error:"Email is required"
        })
        .email(
            "Invalid email format"
        ),

        password:z
        .string({
            error:"Password is required"
        })
        .min(
            6,
            "Password must be at least 6 characters"
        ),

        role:z
        .enum(
            [
                "CUSTOMER",
                "PROVIDER"
            ],
            {
                error:"Role must be CUSTOMER or PROVIDER"
            }
        )

    })

});



// Login

const loginValidationSchema = z.object({

    body:z.object({
        email:z
        .string({
            error:"Email is required"
        })
        .email(
            "Invalid email format"
        ),

        password:z
        .string({
            error:"Password is required"
        })
        .min(
            6,
            "Password must be at least 6 characters"
        )
    })
});


export const authValidation = {
    registerValidationSchema,
    loginValidationSchema
}