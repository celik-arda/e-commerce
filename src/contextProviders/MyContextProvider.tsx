import { createContext, useState, ReactNode } from "react";
import { auth } from '../../firebase.tsx';
import { User, Auth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';


interface AllProducts {
    category: string
    availabilityStatus: string;
    title: string;
    id: number;
    price: number;
    description: string;
    images: any[];
    thumbnail: string;
}

interface MyContextType {
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


const MyAllContext = createContext<MyContextType | undefined>(undefined);

export const MyContextProvider = ({children}: {children: ReactNode}) => {

    const [user, isLogging] = useAuthState(auth);
    const [loadingState, setLoadingState] = useState(true);
    const [searchBarValue, setSearchBarValue] = useState<string>("");
    const [allProducts, setAllProducts] = useState<AllProducts[]>([]);
    const [listResult, setListResult] = useState<AllProducts[]>([]);
    const [searchResultVisible, setSearchResultVisible] = useState<boolean>(false);
    
    const myContext : MyContextType = {

        auth,
        user,
        isLogging,
        loadingState,
        setLoadingState,
        searchBarValue,
        setSearchBarValue,
        searchResultVisible,
        setSearchResultVisible,
        allProducts,
        setAllProducts,
        listResult,
        setListResult,
    }
    
    return (
        <MyAllContext.Provider value={myContext}>{children}</MyAllContext.Provider>
    )
}

export default MyAllContext;