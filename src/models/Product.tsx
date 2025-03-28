import {Auth, User} from 'firebase/auth'

export interface AllProducts {
    category: string
    availabilityStatus: string;
    title: string;
    id: number;
    price: number;
    description: string;
    images: any[];
    thumbnail: string;
}


export interface MyContextType {
    auth: Auth,
    user: User | null | undefined;
    isLogging: boolean | undefined;
    loadingState: boolean;
    setLoadingState: (newValue: boolean) => void;
    searchBarValue: string;
    setSearchBarValue: (value: string) => void;
    searchResultVisible: boolean;
    setSearchResultVisible: (value: boolean) => void;
    allProducts: AllProducts[],
    setAllProducts: (newValue: AllProducts[]) => void,
    listResult: AllProducts[],
    setListResult: (newValue: AllProducts[]) => void,
}


export class Product implements AllProducts {

    category: string
    availabilityStatus: string;
    title: string;
    id: number;
    price: number;
    description: string;
    images: any[];
    thumbnail: string;

    constructor (
        id:number,
        title:string,
        category:string,
        price: number,
        description:string,
        images:any[],
        thumbnail: string,
        availabilityStatus:string

    ) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.price = price;
        this.description = description;
        this.images = images;
        this.thumbnail = thumbnail;
        this.availabilityStatus = availabilityStatus;
    }
}