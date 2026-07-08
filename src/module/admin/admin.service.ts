import { prisma } from "../../lib/prisma"

const getAllUserFromDB = async() =>{
    const user = await prisma.user.findMany({
        omit:{
            password: true
        }
    })

    return user
}

const updateUserStatusIntoDB = async() =>{
    
}

const getAllGearFromDB = async() =>{
    const gear = await prisma.gearItem.findMany()

    return gear
}

const getAllRentalFromDB = async() =>{
    const rental = await prisma.rentalOrder.findMany()

    return rental
}


export const adminService = {
    getAllGearFromDB,
    getAllRentalFromDB,
    updateUserStatusIntoDB,
    getAllUserFromDB
}
