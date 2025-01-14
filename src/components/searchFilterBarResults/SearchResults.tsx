import {useState, useEffect, useContext, useRef} from 'react'
import style from './SearchResults.module.css'
import MyAllContext from '../../contextProviders/MyContextProvider'
import {db} from '../../../firebase'
import {collection} from 'firebase/firestore'
import { searchTheProducts} from '../../utils/helpers/search-products'




const SearchResults = () => {
    
    // select collection named products in firestore //
    const productsRef = collection(db, "products");
    
    // get context api Variables to run searchTheRun() function // 
    let contextVariables = useContext(MyAllContext);
    
    
    if (!contextVariables){
        console.log("sonuçlar yükleniyor...")
        return <div>sonuçlar yükleniyor...</div>;
    }

    const {auth, user, isLogging, loadingState, setLoadingState, searchBarValue, setSearchBarValue, searchResultVisible, setSearchResultVisible, allProducts, setAllProducts, listResult, setListResult} = contextVariables;



    // pick the result-box as a useRef Element //
    let toggleResultBox = useRef<HTMLUListElement>(null);
    
    // add click event with useRef to make result-toggle-off //
    useEffect(() => {
            
            if (searchBarValue !== ""){
        
                const handleClickOutsideOrNot = (e: Event) => {

                    // First, check type of "e.target" for TS //
                    // contains() method needs exact type in TS
                    if (e.target instanceof Node) {
                        
                        // if clicked outside of box, toggle off //
                        if (toggleResultBox.current &&  !toggleResultBox.current.contains(e.target)) {
                            setSearchResultVisible(false);
                            console.log("(result.tsx)  dışarı tıklandı")
                        }
                        else {
                            setSearchResultVisible(true);
                            console.log("(result.tsx)  içeri tıklandı")
                        }
                    }
                }
                
                document.addEventListener("click", handleClickOutsideOrNot);
                
                return () => {
                    document.removeEventListener("click", handleClickOutsideOrNot);
        
                }
            }
            else {
                    setSearchResultVisible(false);
                    console.log("hareket var ama kutu boş")
                }
                
    },[searchBarValue]);


        return (
            
            <ul ref={toggleResultBox} className={style.search_results_active}>
                {
                listResult.map((product, index) => (
                    <li key={index} className={style.result_list_item}>
                        <div className={style.thumb_container}>
                            <img className={style.result_thumb} src={product.thumbnail} alt='results_image' />
                        </div>
                        <div className={style.result_title}>
                            {product.title}
                        </div>
                        <div className={style.result_price}>
                            {product.price} €
                        </div>
                    </li>
                ))
                }
            </ul>
        )
}

export default SearchResults