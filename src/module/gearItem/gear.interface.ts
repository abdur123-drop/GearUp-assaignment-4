import { GearItemWhereInput } from "../../../generated/prisma/models"

export interface IEXPORTGEAR{
    name: string,
    description: string,
    brand?: string,
    pricePerDay: number,
    stock: number,
    availableStock: number,
    condition: string,
    categoryId: string
}

export interface IALLGEARQUERY extends GearItemWhereInput{
    searchTerm ?: string,
    limit?: string,
    page?: string,
    sortBy?: string,
    sortOrder?: string
    minPrice?: string,
    maxPrice?: string
}

export interface IUPDATEGEAR{
    name: string,
    description: string,
    brand?: string,
    pricePerDay: number,
    stock: number,
    availableStock: number,
    condition: string,
    isAvailable: boolean
}