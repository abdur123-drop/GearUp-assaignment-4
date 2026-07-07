import { prisma } from "../../lib/prisma"
import { ICATEGORY } from "./category.interface"


// complete createCategory
const createCategoryIntoDB = async(body: ICATEGORY) =>{

    const category = await prisma.category.create({
        data:{
            ...body
        }
    })

    return category
}

// complete getAllCategories
const getAllCategoriesFromDB = async() =>{
    const categories = await prisma.category.findMany()
    return categories
}

// complete getSingleCategory
const getSingleCategoryFromDB = async(categoryId: string)=>{
    const singleCategory = await prisma.category.findUniqueOrThrow({
        where:{
            id: categoryId
        }
    })

    return singleCategory
}

// complete updateCategory
const updateCategoryIntoDB = async(payload: ICATEGORY, categoryId: string)=>{
    const isCategoryExists = await prisma.category.findUnique({
        where:{
            id: categoryId
        }
    })

    if(!isCategoryExists){
        throw new Error("Sorry! There is no category for this ID")
    }

    const updateCategory = await prisma.category.update({
        where:{
            id: categoryId
        },
        data:{
            ...payload
        }
    })

    return updateCategory
}

// complete deleteCategory
const deleteCategoryFromDB = async(categoryId: string) =>{
    const isCategoryExists = await prisma.category.findUnique({
        where:{
            id: categoryId
        }
    })
    if(!isCategoryExists){
        throw new Error("Sorry! There is no category for this ID")
    }

    await prisma.category.delete({
        where:{
            id: categoryId
        }
    })

}


export const categoryService = {
    createCategoryIntoDB,
    getAllCategoriesFromDB,
    getSingleCategoryFromDB,
    updateCategoryIntoDB,
    deleteCategoryFromDB
}