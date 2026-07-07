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