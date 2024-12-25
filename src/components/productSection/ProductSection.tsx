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
    class Product implements AllProducts {

        category: string
        availabilityStatus: string;
        title: string;
        id: number;
        price: number;
        description: string;
        images: any[];
        thumbnail: string;

        constructor (
            id:number,
            title:string,
            category:string,
            price: number,
            description:string,
            images:any[],
            thumbnail: string,
            availabilityStatus:string

        ) {
            this.id = id;
            this.title = title;
            this.category = category;
            this.price = price;
            this.description = description;
            this.images = images;
            this.thumbnail = thumbnail;
            this.availabilityStatus = availabilityStatus;
        }
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
                    const storeProduct = new Product(
                        eachProduct.id,
                        eachProduct.title,
                        eachProduct.category,
                        eachProduct.price,
                        eachProduct.description,
                        eachProduct.images,
                        eachProduct.thumbnail,
                        eachProduct.availabilityStatus,
                    )
                    setAllProducts((prev) => [...prev, storeProduct]);
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