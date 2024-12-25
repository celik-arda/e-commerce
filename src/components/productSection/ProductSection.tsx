import { useState, useEffect } from 'react';
import { db } from '../../../firebase.tsx';
import { collection, getDocs } from 'firebase/firestore';
import { NavLink } from 'react-router-dom';
import style from './ProductSection.module.css'

const productsRef = collection(db, 'products');

const ProductSection = () => {

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

    const [allProducts, setAllProducts] = useState<AllProducts[]>([]);
    
    
    useEffect(() => {
        getAllProductsFromFirestore(productsRef);
    },[])

        let getAllProductsFromFirestore = (collectionRef : any) => {
            
            getDocs(collectionRef)
            .then(querySnapshot => {
                
                // if my database collection is not empty //
                if (!querySnapshot.empty){
                    
                querySnapshot.forEach((e) => {
                    let eachProduct = e.data() as AllProducts; 
                    setAllProducts((prev) => [...prev, eachProduct]);
                })}
                else {
                    console.log("collection is empty !!!")
                }
            })
            .catch(err => {
                const myErr = err.message;
                console.log("HATA MESAJI : ",myErr)
            })
        }
        
        
    return (
        <div className={style.product_section}>

            <ul className={style.product_list}>
                {allProducts.map((item, index) => (
                    <li key={index} className={style.product_item}>
                        <div className={style.thumbnail_container}>
                            <img className={style.product_thumbnail} src={item.thumbnail} alt='product_photo' />
                        </div>
                        <div>
                            <h3>{item.title}</h3>
                        </div>
                        <div>
                            <h3>{item.price}</h3>
                        </div>
                        <div>
                            <button>Add To Basket</button>
                        </div>
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default ProductSection