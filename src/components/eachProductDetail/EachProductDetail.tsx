import style from './EachProductDetail.module.css'
import {useContext, useState, useEffect} from 'react'
import MyAllContext from '../../contextProviders/MyContextProvider';
import {Routes, Route, useParams, NavLink} from 'react-router-dom'
import {collection, query} from "firebase/firestore";
import {db} from '../../../firebase';
import { getTheProductById } from '../../utils/helpers/get-the-product-by-id-';
import { AllProducts } from '../../models/Product';

const EachProductDetail = () => {

    const productsRef = collection(db, "products");
    
    
    const [productLink, setProductLink] = useState<{[key: string]: string | undefined}>();
    const [selectedProduct, setSelectedProduct] = useState<AllProducts>();
    
    let myUrl = useParams();
    // console.log("MYURL : ",myUrl," -- ",typeof myUrl);
    
    
    let contextVariables = useContext(MyAllContext);

    
    if(!contextVariables){
        console.log("context yükleniyor...")
        return <div>loading context...</div>;
    }
    
    const {auth, user, isLogging, loadingState, setLoadingState, searchBarValue, setSearchBarValue, searchResultVisible, setSearchResultVisible, allProducts, setAllProducts, listResult, setListResult} = contextVariables;
    

    useEffect(() => {

        const productLinkId = myUrl.myUrl;
        
        if (productLinkId) {
            setProductLink({productLinkId})
        }

        if (productLinkId && allProducts) {
            const selectedItem = getTheProductById(allProducts, productLinkId)[0];

            setSelectedProduct(selectedItem);
            console.log(selectedProduct);
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
                    <button>Add To Basket</button>
                </div>
            </div>
        </div>
    )
}

export default EachProductDetail