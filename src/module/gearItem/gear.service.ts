import { GearItemWhereInput } from "../../../generated/prisma/models"
import { prisma } from "../../lib/prisma"
import { IALLGEARQUERY, IEXPORTGEAR, IUPDATEGEAR } from "./gear.interface"

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

const getAllGearFromDB = async(query: IALLGEARQUERY) =>{

    const limit = query.limit ? Number(query.limit) : 5;
    const page = query.page ? Number(query.page) : 1;
    const skip = (page - 1) * limit;
    const allowedSortFilter = ["pricePerDay", "createdAt", "name"]
    const sortBy = allowedSortFilter.includes(query.sortBy as string) ? query.sortBy : "pricePerDay";
    const sortOrder = query.sortOrder ? query.sortOrder : "asc"
    
    const andCondition : GearItemWhereInput[] = []

    if(query.searchTerm){
        andCondition.push({
            OR:[
                {
                    name:{
                        contains: query.searchTerm,
                        mode: "insensitive"
                    }
                },
                {
                    description:{
                        contains: query.searchTerm,
                        mode: "insensitive"
                    }
                }
            ]
        })
    }

    if(query.name){
        andCondition.push({
            name:{
                        contains: query.searchTerm,
                        mode: "insensitive"
                    }
        })
    }

    if(query.description){
        andCondition.push({
            description:{
                        contains: query.searchTerm,
                        mode: "insensitive"
                    }
        })
    }

    if(query.brand){
        andCondition.push({
            brand: query.brand
        })
    }

    if(query.isAvailable){
        andCondition.push({
            isAvailable: JSON.parse(query.isAvailable as string)
        })
    }

    if(query.condition){
        andCondition.push({
            condition: query.condition
        })
    }

    if(query.minPrice || query.maxPrice){
        andCondition.push({
            pricePerDay:{
                gte: query.minPrice ? Number(query.minPrice) : undefined,
                lte: query.maxPrice ? Number(query.maxPrice) : undefined
            }
        })
    }



    const gearAll = await prisma.gearItem.findMany({
        where:{
            AND: andCondition
        },
        take: limit,
        skip,
        orderBy:{
            [sortBy as string] : sortOrder
        }
    })

    const gearCount = await prisma.gearItem.count({
        where:{
            AND: andCondition
        },
        take: limit,
        skip,
        orderBy:{
            [sortBy as string] : sortOrder
        }
    })


    return {
        data: gearAll,
        meta:{
            page,
            limit,
            total: gearCount,
            totalPages: Math.ceil(gearCount /limit)
        }
    }
}

const getSingleGearFromDB = async(gearId: string) =>{
    const singleGear = await prisma.gearItem.findUnique({
        where:{
            id: gearId
        },
        include:{
            provider: {
                omit: {
                    password: true
                }
            }
        }
    })

    if(!singleGear){
        throw new Error("There is no Gear for this ID")
    }

    return singleGear
}



const updateGearIntoDB = async(payload: IUPDATEGEAR, gearId: string, userId: string) =>{
    const gear = await prisma.gearItem.findUnique({
        where:{
            id: gearId
        }
    })

    if(!gear){
        throw new Error("There is no Gear for this ID")
    }

    const user = await prisma.user.findUniqueOrThrow({
        where:{
            id: userId
        }
    })

    if(gear.providerId !== user.id){
        throw new Error("You are not Author of this gear. So you can't update it")
    }

    const updateGear = await prisma.gearItem.update({
        where: {
            id: gear.id || gearId
        },
        data:{
            ...payload
        }
    })

    return updateGear
}

const deleteGearFromDB = async(gearId: string, userId: string) =>{
    const gear = await prisma.gearItem.findUnique({
        where:{
            id: gearId
        }
    })

    if(!gear){
        throw new Error("There is no Gear for this ID")
    }

    const user = await prisma.user.findUniqueOrThrow({
        where:{
            id: userId
        }
    })

    if(gear.providerId !== user.id){
        throw new Error("You are not Author of this gear. So you can't Delete it")
    }

    await prisma.gearItem.delete({
        where:{
            id: gear.id
        }
    })
}

export const gearService = {
    createGearIntoDB,
    getAllGearFromDB,
    getSingleGearFromDB,
    updateGearIntoDB,
    deleteGearFromDB
}