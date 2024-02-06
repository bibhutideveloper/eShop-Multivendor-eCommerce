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
    image: string,
    quantity: undefined | number
    productId: undefined | string
}

export interface cart{
    id: string | undefined,
    name: string,
    price: number,
    color: string,
    category: string,
    description: string,
    image: string,
    quantity: undefined | number
    userId: number,
    productId: string
}

export interface priceSummary{
    price: number,
    discount: number,
    tax: number,
    delivery: number,
    total: number
}

export interface orders{
    name: string,
    email: string,
    mobule: string,
    address: string,
    totalPrice: number,
    userId: number
}