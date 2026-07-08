import { UserStatus } from "../../../generated/prisma/enums"
import { prisma } from "../../lib/prisma"

const getAllUserFromDB = async() =>{
    const user = await prisma.user.findMany({
        where:{
            role:{
                not: "ADMIN"
            }
        },
        omit:{
            password: true
        }
    })

    return user
}

const updateUserStatusIntoDB = async(status: UserStatus, userId:string) =>{
    const user = await prisma.user.findUnique({
        where:{
            id: userId
        }
    })

    if(!user){
        throw new Error("There is no User for this ID")
    }

    if(user.role === "ADMIN"){
        throw new Error("Admin Can't Change His Own Status")
    }

    const userStatusUpdate = await prisma.user.update({
        where:{
            id: userId
        },
        data:{
            status
        },
        omit:{
            password: true
        }
    })

    return userStatusUpdate
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
