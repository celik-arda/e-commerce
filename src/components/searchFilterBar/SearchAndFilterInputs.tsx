import { useState, useContext, useEffect} from 'react';
import style from './SearchAndFilterInputs.module.css'
import MyAllContext from '../../contextProviders/MyContextProvider';
import SearchResults from '../../components/searchFilterBarResults/SearchResults'
import { searchTheProducts } from '../../utils/helpers/search-products'
import {collection} from 'firebase/firestore'
import {db} from '../../../firebase'

const SearchAndFilterInputs = () => {


    let contextVariables = useContext(MyAllContext);

    if(!contextVariables){
        console.log("context yükleniyor...")
        return <div>loading context...</div>
    }
    
    const {auth, user, isLogging, loadingState, setLoadingState, searchBarValue, setSearchBarValue, searchResultVisible, setSearchResultVisible, allProducts, setAllProducts} = contextVariables;

    useEffect(() => {
        if (searchBarValue !== ""){
            setSearchResultVisible(true);
        }
        else{
            setSearchResultVisible(false);
        }

    },[searchBarValue])

    return (
        // <>
        <div className={style.search_filter_container}>
            <div className={style.search_area}>
                <form className={style.search_form}>
                    <input value={searchBarValue} onChange={e => setSearchBarValue(e.target.value)} placeholder='search product'/>
                </form>
                <div className={`${ searchResultVisible ? style.search_result_visible : style.search_result_invisible}`}>
                    {
                        searchResultVisible
                        ?
                        (<SearchResults />)
                        :
                        (<span></span>)
                    }
                </div>
            </div>
            <div className={style.filter_area}>
                <form>
                    <input placeholder='filter product' />
                </form>
            </div>

        </div>
        // </>
    )
}

export default SearchAndFilterInputs