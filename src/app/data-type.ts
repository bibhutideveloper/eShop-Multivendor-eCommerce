export interface signUp{
    name: string,
    email: string,
    password: string
}

export interface logIn{
    email: string,
    password: string
}

export interface product{
    id: string,
    name: string,
    price: number,
    color: string,
    category: string,
    description: string,
    image: string
}
