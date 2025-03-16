import style from './EachProductDetail.module.css'
import {useContext, useState, useEffect} from 'react'
import MyAllContext from '../../contextProviders/MyContextProvider';
import {json, useParams} from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth';
import {collection} from "firebase/firestore";
import {db} from '../../../firebase';
import { getTheProductById } from '../../utils/helpers/get-the-product-by-id-';
// AllProducts Typescript interface //
import { AllProducts } from '../../models/Product';


const EachProductDetail = () => {    
    
    const [productLink, setProductLink] = useState<{[key: string]: string | undefined}>();
    const [selectedProduct, setSelectedProduct] = useState<AllProducts>();
    const [userBasketItems, setUserBasketItems] = useState<AllProducts[]>([]);
    
    let contextVariables = useContext(MyAllContext);

    
    if(!contextVariables){
        return <div>loading context...</div>;
    }
    
    const {auth, user,allProducts} = contextVariables;
    
    // get the product id from url //
    let myUrl = useParams();
    let productLinkId = myUrl.myUrl
    
    useEffect(() => {
        if (productLinkId) {
            setProductLink({productLinkId})
            const selectedItem: AllProducts = getTheProductById(allProducts, productLinkId)[0];
            setSelectedProduct(selectedItem);
        }
    },[])


    const saveBasketToSessionStorage = (storagekey:string, prod: AllProducts | AllProducts[]) => {
        
        const existingSessionData: string | null = sessionStorage.getItem(`${storagekey}`);

        if (!productLinkId) {
            return;
        }
        
        if (existingSessionData === null) {
            let selectedArrayData = [prod];
            sessionStorage.setItem(`${storagekey}`, JSON.stringify(selectedArrayData));
        }
        else if (existingSessionData) {
            const existingParsedData: AllProducts[] = JSON.parse(existingSessionData);
            const updatedBasketData = [...existingParsedData, prod];
            sessionStorage.setItem(`${storagekey}`, JSON.stringify(updatedBasketData));
        }
    }


    const handleToSaveProductInBasket = async(e: React.MouseEvent<Node>) => {
        
        e.preventDefault();

        if(!productLinkId) {
            return;
        }

        const selectedItem: AllProducts = getTheProductById(allProducts, productLinkId)[0];
        
        if (auth && user && productLinkId) {
            
            saveBasketToSessionStorage("user_basket",selectedItem);
        }
    }

    if(!selectedProduct){
        return <div>ITEM IS UNAVAILABLE</div>
    }
    return (
        <div className={style.detail_page}>
            <div className={style.detail_img_container}>
                <img src={selectedProduct.images[0]} className={style.detail_img} alt='more_info_image' />
            </div>
            <div className={style.detail_info_container}>
                <h2 className={style.title_area}>
                    {selectedProduct.title}
                </h2>
                <div className={style.description_area}>
                    {selectedProduct.description}
                </div>
                <div className={style.price_and_buttons}>
                    <h3>{selectedProduct.price}<span> €</span></h3>
                    <button onClick={handleToSaveProductInBasket}>Add To Basket</button>
                </div>
            </div>
        </div>
    )
}

export default EachProductDetail