import { prisma } from "../../lib/prisma"
import { IRENTALCREATE } from "./rentelOrder.interface"


const createRentalIntoDB = async(payload: IRENTALCREATE, userId : string) =>{
    const user = await prisma.user.findUniqueOrThrow({
        where:{
            id: userId
        }
    })

    const {gearItemId, quantity, startDate, endDate} = payload;
    const gear = await prisma.gearItem.findUniqueOrThrow({
        where:{
            id: gearItemId
        }
    })

    if(quantity > gear.availableStock){
        throw new Error("Not Enough Stock Available")
    }

    const startDateFormat = new Date(startDate)
    const endDateFormat = new Date(endDate)

    if(endDateFormat <= startDateFormat){
        throw new Error("Invalid rental date! End date must be after start date")
    }

    const days = Math.ceil((endDateFormat.getTime() - startDateFormat.getTime()) / (1000*60*60*24))
    const totalAmount = gear.pricePerDay * quantity * days;
    const transactionResult = prisma.$transaction(async(tx)=>{
        await tx.gearItem.update({
            where:{
                id: gear.id
            },
            data:{
                availableStock:{
                    decrement: quantity
                }
            }
        })


        const createRental = await tx.rentalOrder.create({
            data:{
                customerId: user.id,
                gearItemId,
                quantity,
                startDate: startDateFormat,
                endDate: endDateFormat,
                totalAmount
            }
        })

        return createRental
    })
console.log(transactionResult);
    return transactionResult
}


const getMyRentalFromDB = async(userId : string) =>{
    const user = await prisma.user.findUniqueOrThrow({
        where:{
            id: userId
        }
    })

    const rentalOrder = await prisma.rentalOrder.findMany({
        where:{
            customerId: user.id
        }
    })

    return rentalOrder
}

const getSingleRentalFromDB = async(rentalOrderId: string) =>{
    const rentalOrder = await prisma.rentalOrder.findUnique({
        where:{
            id: rentalOrderId
        }
    })

    if(!rentalOrder){
        throw new Error("There is no rentalOrder for this ID")
    }

    return rentalOrder
}

const updateRentalStatusIntoDB = async(userId: string, payload: any, rentalId: string) =>{
    const {status} = payload;
    const user = await prisma.user.findUniqueOrThrow({
        where:{
            id: userId
        }
    })


    const rentalOrder = await prisma.rentalOrder.findUnique({
        where:{
            id: rentalId
        },
        include:{
            gearItem: true
        }
    })

    if(!rentalOrder){
    throw new Error("Rental not found");
}

    

    if(user.id !== rentalOrder.gearItem.providerId){
        throw new Error("You cannot update this order");
    }

    const updateRental = await prisma.rentalOrder.update({
        where:{
            id: rentalOrder.id
        },
        data:{
            status
        }
    })

    return updateRental
}


export const rentalOrderService = {
    createRentalIntoDB,
    getMyRentalFromDB,
    getSingleRentalFromDB,
    updateRentalStatusIntoDB
}