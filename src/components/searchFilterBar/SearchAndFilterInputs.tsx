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

        let contextVariables = useContext(MyAllContext);
        
        if(!contextVariables){
            console.log("context yükleniyor...")
            return <div>loading context...</div>
        }
        
        const {auth, user, isLogging, loadingState, setLoadingState, searchBarValue, setSearchBarValue, searchResultVisible, setSearchResultVisible, allProducts, setAllProducts, listResult, setListResult} = contextVariables;
        
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
                    <form>
                        <input placeholder='filter product' />
                    </form>
                </div>

            </div>

        )
    }

    export default SearchAndFilterInputs