import style from './ProductSection.module.css'
// import style from './ProductSection.module.scss'
import { useEffect, useContext } from 'react';
import MyAllContext from '../../contextProviders/MyContextProvider.tsx'
import { collection, CollectionReference } from 'firebase/firestore';
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
    
    const {allProducts, setAllProducts, sortingPriceType, setSortingPriceType} = contextVariables;
    
    let getProductsFromFirestoreAndList = (collectionRef : CollectionReference) => {
        
        UIprocess.getAllProductsAndList(collectionRef, setAllProducts);

        return allProducts;
    }

    // Product Sorting Function (Based On Price)  //
    const sortingProductBasedOnPrice = async (sortingType: string) : Promise<void> => {
        
        let defaultAllProducts: AllProducts[] = await UIprocess.getAllProductsAndList(productsRef, setAllProducts);
        
        console.log("sıralanmadan önce çekilen data : ",defaultAllProducts)

        let sortedAllProducts : AllProducts[] = []; 
        
        if (!defaultAllProducts) {
            return;
        }
        else {
            if (sortingType === "default") {
                return;
            }
            else if (sortingType === "toHigh") {
                sortedAllProducts = defaultAllProducts.sort((a, b) => a.price - b.price);
            }
            else if (sortingType === "toLow") {
                sortedAllProducts = defaultAllProducts.sort((a, b) => b.price - a.price);
            }
        }
        setAllProducts(sortedAllProducts);
            
    }

    // When sort-select-form was changed, sort the products //
    useEffect(() => {
        sortingProductBasedOnPrice(sortingPriceType);
    },[sortingPriceType])


    // When page was opened, get the products //
    useEffect(() => {
        getProductsFromFirestoreAndList(productsRef);
    },[])
        
        
    return (
        <div className={style.product_section}>
            <ul className={style.product_list}>
                {
                    allProducts && allProducts.map((item: AllProducts | undefined, index) => (

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
