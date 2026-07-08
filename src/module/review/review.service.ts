import { prisma } from "../../lib/prisma"
import { ICREATEREVIEW } from "./review.interface"

const createReviewIntoDB = async(userId : string, payload: ICREATEREVIEW) =>{
    const {rentalOrderId, rating, comment} = payload;
    const rentalOrder = await prisma.rentalOrder.findUnique({
        where:{
            id: rentalOrderId
        }
    })

    if(!rentalOrder){
        throw new Error("There is no rentalOrder for this rentalOrderId")
    }

    if(rentalOrder.customerId !== userId){
        throw new Error("Unauthorized")
    }

    if(rentalOrder.status !== "RETURNED"){
        throw new Error("You can review only after returning gear")
    }

    const review = await prisma.review.create({
        data:{
            customerId: userId,
            gearItemId: rentalOrder.gearItemId,
            rentalOrderId: rentalOrder.id,
            rating,
            comment
        }
    })

    return review
}

export const reviewService = {
    createReviewIntoDB
}