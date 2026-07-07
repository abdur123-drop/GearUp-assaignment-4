import { prisma } from "../../lib/prisma"
import { IEXPORTGEAR } from "./gear.interface"

const createGearIntoDB = async(payload : IEXPORTGEAR, userId : string) =>{
    const user = await prisma.user.findUniqueOrThrow({
        where:{
            id: userId
        }
    })

    const gear = await prisma.gearItem.create({
        data:{
            ...payload,
            providerId: user.id
        },
        include:{
            provider: {
                omit:{
                    password: true
                }
            },
            category: true
        }
    })

    return gear
}   

const getAllGearFromDB = async() =>{

}

const getSingleGearFromDB = async() =>{

}

const updateGearIntoDB = async() =>{

}

const deleteGearFromDB = async() =>{

}

export const gearService = {
    createGearIntoDB,
    getAllGearFromDB,
    getSingleGearFromDB,
    updateGearIntoDB,
    deleteGearFromDB
}