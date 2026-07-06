export interface ICREATEUSER{
    name: string,
    email: string,
    password: string,
    role: "CUSTOMER" | "PROVIDER"
}


export interface ILOGIN{
    email: string,
    password: string
}