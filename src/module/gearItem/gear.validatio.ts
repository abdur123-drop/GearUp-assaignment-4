import { z } from "zod";


export const createGearValidationSchema = z.object({
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

export const gearValidation = {

createGearValidationSchema

}