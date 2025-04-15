import style from './ProductSection.module.css'
import { useEffect, useContext } from 'react';
import MyAllContext from '../../contextProviders/MyContextProvider.tsx'
import { collection } from 'firebase/firestore';
import { db } from '../../../firebase.tsx';
import SingleProduct from '../singleProduct/SingleProduct.tsx';

// Product class and AllProducts interface  //
import { AllProducts } from '../../models/Product.tsx'

// Static class to make UI operations  //
import { UIprocess } from '../../models/UIprocess.tsx';



const ProductSection = () => {

    // Variable to fetch neccessary data from firestore //
    const productsRef = collection(db, 'products');


    
    const contextVariables = useContext(MyAllContext)

    if (!contextVariables) {
        return <div>productsection load...</div>;
    }
    
    const {allProducts, setAllProducts} = contextVariables;
    
    let getProductsFromFirestoreAndList = (collectionRef : any) => {
        
        UIprocess.getAllProductsAndList(collectionRef, setAllProducts);

        return allProducts;
    }
    
    useEffect(() => {
        getProductsFromFirestoreAndList(productsRef);
    },[])
        
        
    return (
        <div className={style.product_section}>
            <ul className={style.product_list}>
                {
                    allProducts.map((item: AllProducts | undefined, index) => (

                        <li key={index} className={style.product_item}>
                            <SingleProduct item={item} />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default ProductSection
