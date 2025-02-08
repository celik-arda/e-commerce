import {Navigate, NavLink} from 'react-router-dom'
import {useEffect, useState, useContext} from 'react';
import {onAuthStateChanged} from 'firebase/auth'
// import {auth} from '../../../firebase.tsx'
import MyAllContext from '../../contextProviders/MyContextProvider.tsx';
import { AllProducts } from '../../models/Product.tsx';
import style from './Basket.module.css'


const Basket = () => {

    const [allBasketItems, setAllBasketItems] = useState<AllProducts[]>([])
    const [totalBasketPrice, setTotalBasketPrice] = useState<number>(0)

    const contextVariables = useContext(MyAllContext);
    if (!contextVariables) {
        return <div>context undefined</div>
    }

    const {auth, user, userAuthState, setUserAuthState} = contextVariables;

    const displayBasketItems = (storageKey:string) => {
        const existingStorageItems = sessionStorage.getItem(`${storageKey}`);
        if (existingStorageItems === null) {
            return;
        }
        else if (existingStorageItems) {
            const parsedProducts: AllProducts[] = JSON.parse(existingStorageItems);
            const totalBasketPrice = parsedProducts.reduce((total, item) => total + item.price, 0);
            
            // display all products in basket page //
            setAllBasketItems(parsedProducts);

            // display total price that user will pay //
            setTotalBasketPrice(totalBasketPrice);
        }
    }
    
    useEffect(() => {
        // decide to pass or not to basket based on user validation //
        onAuthStateChanged(auth, (validUser) => {
            if (!validUser) {
                setUserAuthState(false);
            }
            else if (validUser) {
                setUserAuthState(true);
                displayBasketItems("user_basket");
            }
        })

    },[])


    if (!userAuthState) {
        return (
            // <Navigate to='/signin' replace />
            <div><h1>Please login to continue</h1></div>
        )
    }
    // user has logged in, consumer can pass to basket //
    else if (userAuthState){

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
                                <li key={index}>
                                    <div className={style.img_box}>
                                        <img src={item.thumbnail} alt='basket_img' />
                                    </div>
                                    <div className={style.title_box}>
                                        {item.title}
                                    </div>
                                    <div className={style.price_box}>
                                        {item.price} £
                                    </div>
                                    <div className={style.remove_box}>
                                        <button className={style.remove_button}>remove</button>
                                    </div>
                                </li>
                            )))
                        }

                            {/* Products that are in basket */}
                        </ul>
                    </div>
                    <div className={style.basket_info_area}>
                        <div className={style.product_piece_area}>
                            <span>{allBasketItems.length}</span>
                            <h4>piece of product in your basket</h4>
                        </div>
                        <div className={style.price_area}>
                            <h4>Total Price : </h4>
                            <span>{totalBasketPrice}</span>
                            <span>£</span>
                        </div>
                    </div>
                    <div className={style.button_area}>
                        <button className={style.continue_button}><NavLink to='/address_payment'>Continue</NavLink></button>
                    </div>
                
                </div>
            )
    }
}
        

export default Basket