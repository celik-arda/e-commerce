import style from './Basket.module.css'
import {Navigate} from 'react-router-dom'
import {useEffect, useState, useContext} from 'react';
import {onAuthStateChanged} from 'firebase/auth'
// import {auth} from '../../../firebase.tsx'
import MyAllContext from '../../contextProviders/MyContextProvider.tsx';



const Basket = () => {

    
    const [userAuthState, setUserAuthState] = useState<boolean>(false);

    const contextVariables = useContext(MyAllContext);
    if (!contextVariables) {
        return <div>context undefined</div>
    }

    const {auth} = contextVariables;


    // decide to pass or not to basket based on user validation //
    const checkUserAuthState = async() => {

        onAuthStateChanged(auth, (validUser) => {
            
            // user can keep passing to Basket for payment // 
            if(validUser) {
                setUserAuthState(true);
                return "success";
            }
            else if (!validUser)
                setUserAuthState(false);
        })
    }


    useEffect(() => {
        checkUserAuthState();
    },[auth])


        // user has logged in, consumer can pass the payment //
        if (userAuthState){

            return (
                <div>     
                
                    <div>
                        <h2>Basket</h2>
                    </div>
                    <div>
                        <ul>
                            {/* Products that are in basket */}
                        </ul>
                    </div>
                    <div>
                        X piece of product in your basket
                    </div>
                    <div>
                        <h3>Total Price</h3>
                        <div>XYZ.xx Pound</div>
                    </div>
                    <div>
                        <button>Go to next page</button>
                    </div>
                
                </div>
            )
        }
        else if (!userAuthState) {
            return (
                // <Navigate to='/signin' replace />
                <div><h1>BASKET COMPONENT DEVAM EDEMEZ</h1></div>
            )
        }
}
        

export default Basket