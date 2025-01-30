import style from './Basket.module.css'
import {Navigate} from 'react-router-dom'
import {useEffect, useState, useContext} from 'react';
import {onAuthStateChanged} from 'firebase/auth'
// import {auth} from '../../../firebase.tsx'
import MyAllContext from '../../contextProviders/MyContextProvider.tsx';
import { AllProducts } from '../../models/Product.tsx';



const Basket = () => {

    const [allBasketItems, setAllBasketItems] = useState<AllProducts[]>([])

    const contextVariables = useContext(MyAllContext);
    if (!contextVariables) {
        return <div>context undefined</div>
    }

    const {auth, user, userAuthState, setUserAuthState} = contextVariables;


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
        if (!auth || !user) {
            console.log("sfasafsdaf")
        }
        if (auth && user) {

            let basketIncludings = sessionStorage.getItem(`basket__${user.uid}`)
            console.log("session kontrol : ",basketIncludings, typeof basketIncludings);
            if(basketIncludings === null){
                sessionStorage.setItem(`basket__${user.uid}`,JSON.stringify([]));
            }
            else{
                const parsedBasketItems: AllProducts[] = JSON.parse(basketIncludings);
                console.log("oturumda çekilenler : ",parsedBasketItems,typeof parsedBasketItems);
                setAllBasketItems([...parsedBasketItems]);
                console.log("güncellenen array : ",allBasketItems)
            }
        }
    },[])


        // user has logged in, consumer can pass the payment //
        if (userAuthState){

            return (

                <div className={style.basket_container}>
                
                    <div className={style.title_area}>
                        <h2>Basket</h2>
                    </div>
                    <div className={style.list_area}>
                        <ul>
                            {
                                allBasketItems.length === 0 ?
                                (<li>your basket is empty</li>)
                                :
                                (allBasketItems.map((item, index) => (
                                <li key={index} className={style.list_item}>
                                    <div className={style.img_box}>
                                        <img alt='basket_img' />
                                    </div>
                                    <div className={style.title_box}>
                                        {item.title}
                                    </div>
                                    <div className={style.price_box}>
                                    
                                    </div>
                                </li>
                            )))
                        }

                            {/* Products that are in basket */}
                        </ul>
                    </div>
                    <div className={style.basket_info_area}>
                        X piece of product in your basket
                    </div>
                    <div className={style.price_area}>
                        <h3>Total Price</h3>
                        <div>XYZ.xx Pound</div>
                    </div>
                    <div className={style.button_area}>
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