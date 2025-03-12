import style from './ProductSection.module.css'
import { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom'
import MyAllContext from '../../contextProviders/MyContextProvider.tsx'
import { collection, getDocs } from 'firebase/firestore';
import { Auth, User } from 'firebase/auth';
import { db } from '../../../firebase.tsx';
import { Product } from '../../models/Product.tsx'
import EachProductDetail from '../eachProductDetail/EachProductDetail.tsx';
import SingleProduct from '../singleProduct/SingleProduct.tsx';



const ProductSection = () => {

    // Variable to fetch neccessary data from firestore //
    const productsRef = collection(db, 'products');

    interface MyContextType {
        auth: Auth,
        user: User | null | undefined;
        isLogging: boolean | undefined;
        loadingState: boolean;
        setLoadingState: (newValue: boolean) => void;
        searchBarValue: string;
        setSearchBarValue: (value: string) => void;
        searchResultVisible: boolean;
        setSearchResultVisible: (value: boolean) => void;
        allProducts: AllProducts[],
        setAllProducts: (newValue: AllProducts[] | []) => void,
        listResult: AllProducts[],
        setListResult: (newValue: AllProducts[]) => void,
    }

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
    
    const contextVariables = useContext(MyAllContext)

    if (!contextVariables) {
        return <div>productsection load...</div>;
    }
    
    const {allProducts, setAllProducts} = contextVariables;
    
    let getAllProductsFromFirestore = (collectionRef : any) => {
        
        getDocs(collectionRef)
        .then(querySnapshot => {
            
            // if my database collection is not empty //
            if (!querySnapshot.empty){
                
                let fetchedProducts: AllProducts[] = querySnapshot.docs.map((e) => {
                    
                    let eachProduct = e.data() as AllProducts; 
                    // create inherited Product object //
                    return new Product(
                        eachProduct.id,
                        eachProduct.title,
                        eachProduct.category,
                        eachProduct.price,
                        eachProduct.description,
                        eachProduct.images,
                        eachProduct.thumbnail,
                        eachProduct.availabilityStatus,
                    )
                })
                setAllProducts(fetchedProducts);
            }
            else {
                console.log("collection is empty !!!");
            }
        })
        .catch(err => {
            const myErr = err.message;
            console.log("HATA MESAJI : ",myErr)
        })

        setAllProducts(allProducts);
        return allProducts;
    }
    
    useEffect(() => {
        getAllProductsFromFirestore(productsRef);
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
