import style from './EachProductDetail.module.css'
import {useContext, useState, useEffect} from 'react'
import MyAllContext from '../../contextProviders/MyContextProvider';
import {useParams} from 'react-router-dom'
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
        console.log("context yükleniyor...")
        return <div>loading context...</div>;
    }
    
    const {auth, user,allProducts} = contextVariables;

    
    // get the product id from url //
    let myUrl = useParams();
    let productLinkId = myUrl.myUrl
    
    
    const handleToSaveProductInBasket = async(e: React.MouseEvent<Node>) => {
        e.preventDefault();

        if(!auth || !user) {
            return <div>user is not valid</div>
        }
        
        if (!productLinkId) {
            return <div>No Clicked Product Id</div>
        }

        if (auth || user || productLinkId) {
            
            const updatedUserId = user.uid;
            
            const selectedItem = getTheProductById(allProducts, productLinkId)[0];
            
            let existingData = sessionStorage.getItem(`basket__${updatedUserId}`);

            if (existingData === null) {

                    const pickedProduct = [selectedItem]
                    setUserBasketItems([selectedItem]);
                    
                    sessionStorage.setItem(`basket__${updatedUserId}`,JSON.stringify(pickedProduct));
            }
            else {
                const parsedExistingItems : AllProducts[] = JSON.parse(existingData);
                    
                const updatedAllBasketItems = [...parsedExistingItems, selectedItem];
                    
                setUserBasketItems(updatedAllBasketItems);
                    
                sessionStorage.setItem(`basket__${updatedUserId}`, JSON.stringify(updatedAllBasketItems));
                
            }
        }
    }


    useEffect(() => {
        
        if (productLinkId) {
            setProductLink({productLinkId})
        }

        if (productLinkId && allProducts) {
            const selectedItem = getTheProductById(allProducts, productLinkId)[0];

            setSelectedProduct(selectedItem);
        }
        },[])

    if(!selectedProduct){
        return <div>ITEM IS UNAVAILABLE</div>
    }
    return (
        <div className={style.detail_page}>
            <div className={style.detail_img_container}>
                <img src={selectedProduct.images[0]} className={style.detail_img}/>
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