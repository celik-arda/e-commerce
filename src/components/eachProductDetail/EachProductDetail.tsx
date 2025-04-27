import style from './EachProductDetail.module.css'
import {useContext, useState, useEffect} from 'react'
import MyAllContext from '../../contextProviders/MyContextProvider';
import {useParams} from 'react-router-dom'
import { getTheProductById } from '../../utils/helpers/get-the-product-by-id-';

// Static Class For Storage Process  //
import { BrowserStorage } from '../../models/BrowserStorageProcess.tsx';

// AllProducts Typescript interface //
import { AllProducts } from '../../models/Product';


const EachProductDetail = () => {
    const [productLink, setProductLink] = useState<{[key: string]: string | undefined}>();
    const [selectedProduct, setSelectedProduct] = useState<AllProducts>();

    let contextVariables = useContext(MyAllContext);
    
    
    if(!contextVariables){
        return <div>loading context...</div>;
    }
    
    //  get context  //
    const {auth, user,allProducts} = contextVariables;
    
    // get the product id from url //
    let myUrl = useParams();
    let productLinkId = myUrl.myUrl

    useEffect(() => {
        console.log("safdsdfsfasfsdafsfasasfsdfsafsfs")
        
        if (productLinkId) {
            setProductLink({productLinkId})
            const selectedItem: AllProducts = getTheProductById(allProducts, productLinkId)[0];
            setSelectedProduct(selectedItem);
        }
    },[])
        
        const saveBasketToSessionStorage = (storage_key:string, product: AllProducts, product_link_id: string) => {


            const existingSessionData = BrowserStorage.getItemsFromSessionStorage(`${storage_key}`)
            
            if (!product_link_id) {
                return;
            }

            BrowserStorage.saveItemsToSessionStorage(existingSessionData, product, storage_key);
            

        }
            
    const handleToSaveProductInBasket = async(e: React.MouseEvent<Node>) => {
        
        e.preventDefault();

        if(!productLinkId) {
            return;
        }

        const selectedItem: AllProducts = getTheProductById(allProducts, productLinkId)[0];
        
        if (auth && user && productLinkId) {
            
            saveBasketToSessionStorage("user_basket",selectedItem, productLinkId);
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