import './App.css';
import {useContext, useEffect} from 'react'
import AppRoutes from './routes/AppRoutes.tsx';
import {Routes, Route, useParams} from 'react-router-dom'
import ForgotPassword from './components/authComponents/forgotPassword/ForgotPassword.tsx';


import MyAllContext from './contextProviders/MyContextProvider.tsx';

//  ---  Page Layout Navbar  --- //
import Navbar from './layouts/navbar/Navbar.tsx'

// ---  Firebase Objects For Authentication --- //
import {Auth, User} from 'firebase/auth'


function App() {
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

        
        const {allProducts} = contextVariables;
        
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
