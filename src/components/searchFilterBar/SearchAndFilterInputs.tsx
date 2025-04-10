    import { useState, useContext, useEffect, useRef} from 'react';
    import style from './SearchAndFilterInputs.module.css'
    import MyAllContext from '../../contextProviders/MyContextProvider';
    import SearchResults from '../../components/searchFilterBarResults/SearchResults'

    //  Inheritance-Based Objects //
    import { Product } from '../../models/Product'

    // Utils Functions //
    import { searchTheProducts } from '../../utils/helpers/search-products'
    // (END) Utils Functions //

    //  Firebase Variables And Hooks //
    import {collection} from 'firebase/firestore'
    import {db} from '../../../firebase'
    //  (END) Firebase Variables And Hooks //


    const SearchAndFilterInputs = () => {
        
        // select collection named products in firestore //
        const productsRef = collection(db, "products");

        const [selectListValue, setSelectListValue] = useState();

        let contextVariables = useContext(MyAllContext);
        
        if(!contextVariables){
            console.log("context yükleniyor...")
            return <div>loading context...</div>
        }
        
        const {searchBarValue, setSearchBarValue, searchResultVisible, setSearchResultVisible, setListResult} = contextVariables;

        const handleSortinProductList = (e: any) => {

            setSelectListValue(e.target.value);
        }        
        useEffect(() => {
        
            if(searchBarValue !== ""){
                setSearchResultVisible(true);
                searchTheProducts(searchBarValue, setListResult, productsRef);
            }
        
        },[searchBarValue]);
        

        return (

            <div className={style.search_filter_container}>
                <div className={style.search_area}>
                    <form className={style.search_form}>
                        <input value={searchBarValue} onChange={e => setSearchBarValue(e.target.value)} placeholder='search product'/>
                    </form>

                    {searchResultVisible && <SearchResults />}

                </div>
                <div className={style.filter_area}>
                    <form className={style.sort_form_area}>

                        <select value={selectListValue} onChange={handleSortinProductList}>
                            <option value="lowToHigh">Price: Low to High</option>
                            <option value="highToLow">Price: High to Low</option>
                        </select>
                        <img src='/sort_product_icon_.png' />
                    </form>
                </div>

            </div>

        )
    }

    export default SearchAndFilterInputs