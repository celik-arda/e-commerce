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
        return <div>sonuçlar yükleniyor...</div>;
    }

    const {searchBarValue, setSearchBarValue, searchResultVisible, setSearchResultVisible, listResult} = contextVariables;


    // pick the result-box as a useRef Element //
    let toggleResultBox = useRef<HTMLUListElement>(null);
    
    // add click event with useRef to make result-toggle-off //
    useEffect(() => {

    if (searchBarValue.trim() !== "") {
        let allowClose = false;

        const timer = setTimeout(() => {
            allowClose = true;
        }, 100); // At first time, prevent closing //

        const handleClickOutsideOrNot = (e: MouseEvent) => {
            if (!allowClose) return;

            if (e.target instanceof Node) {
                if (toggleResultBox.current && !toggleResultBox.current.contains(e.target)) {
                    setSearchResultVisible(false);
                }
            }
        };

        document.addEventListener("click", handleClickOutsideOrNot);

        return () => {
            document.removeEventListener("click", handleClickOutsideOrNot);
            clearTimeout(timer);
        };
    } else {
        setSearchResultVisible(false);
    }
}, [searchBarValue]);



    // If a word was written but there is no product found //
    // if (searchResultVisible && listResult.length === 0) {
    //     return (
    //             <span className={style.no_result_area}>
    //                 <h2 className={style.no_result_text}>No result</h2>
    //             </span>
    //     );
    // }

    // A word was searched and some products was found  //
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
                        {product.price} £
                    </div>
                </li>

            ))
            }
        </ul>
    )
}

export default SearchResults