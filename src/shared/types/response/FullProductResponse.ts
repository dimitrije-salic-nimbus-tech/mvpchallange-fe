export type FullProductResponse = {
    id: string;
    name: string;
    amountAvailable: number;
    currentPrice: number;
    seller: {
        id:string;
        username:string;
    }
};
