import './App.css';
import {useContext, useEffect} from 'react'
import AppRoutes from './routes/AppRoutes.tsx';
import {Routes, Route, useParams} from 'react-router-dom'
import ForgotPassword from './components/authComponents/forgotPassword/ForgotPassword.tsx';


import MyAllContext from './contextProviders/MyContextProvider.tsx';

//  ---  Page Layout Navbar  --- //
import Navbar from './layouts/navbar/Navbar.tsx'
//  ---  (END)  Page Layout Navbar  --- //


// ---  Components  ---  //
import HomePage from './components/homePage/HomePage.tsx'
import UserProfile from './layouts/authButtonsContainer/userProfile/UserProfile.tsx';
import Basket from './components/basket/Basket.tsx';
import SignIn from './components/authComponents/signIn/SignIn.tsx'
import SignUp from './components/authComponents/signUp/SignUp.tsx'
import SignOut from './components/authComponents/signOut/SignOut.tsx';
import EachProductLayout from './layouts/eachProductLayout/EachProductLayout.tsx'
import EachProductDetail from './components/eachProductDetail/EachProductDetail.tsx'
// ---  (END)  Components  ---  //

import {Auth, User} from 'firebase/auth'


// Inheritance-based Object ""Product //
import { Product } from './models/Product.tsx'
import { MyContextType, AllProducts } from './models/Product.tsx'


function App() {
    
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
            setAllProducts: (newValue: AllProducts[] | []) => void,
            listResult: AllProducts[],
            setListResult: (newValue: AllProducts[]) => void,
        }

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
    const contextVariables = useContext(MyAllContext);
 

    if(!contextVariables){
        console.log("context yükleniyor...")
        return <div>loading context...</div>;
    }

        
        const {auth, user, isLogging, loadingState, setLoadingState, searchBarValue, setSearchBarValue, searchResultVisible, setSearchResultVisible, allProducts, setAllProducts, listResult, setListResult} = contextVariables;
        
        let all_items: AllProducts[];

    useEffect(() => {

        if(allProducts.length !== 0){
            all_items = allProducts;
        }
        

    },[allProducts])
        
    return (

        <>
            <div className="page_container">

                {/* ---  Navbar Layout  --- */}
                <Navbar />
                
                {/* ---  Project Routes  --- */}
                <AppRoutes />

            </div>
        </>
    )
}

export default App
