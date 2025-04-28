    import { useContext, useEffect} from 'react';
    import style from './SearchAndFilterInputs.module.css'
    import MyAllContext from '../../contextProviders/MyContextProvider';
    import SearchResults from '../../components/searchFilterBarResults/SearchResults'

    // Utils Functions //
    import { searchTheProducts } from '../../utils/helpers/search-products'


    //  Firebase Variables And Hooks //
    import {collection} from 'firebase/firestore'
    import {db} from '../../../firebase'



    const SearchAndFilterInputs = () => {
        
        // select collection named products in firestore //
        const productsRef = collection(db, "products");

        let contextVariables = useContext(MyAllContext);
        
        if(!contextVariables){
            return <div>loading context...</div>
        }
        
        const {searchBarValue, setSearchBarValue, searchResultVisible, setSearchResultVisible, setListResult, sortingPriceType, setSortingPriceType} = contextVariables;

        const handleSortingProductList = (e: any) => {
            setSortingPriceType(e.target.value);
        }

        useEffect(() => {
            const trimmed = searchBarValue.trim();
    
            if (trimmed !== "") {
                searchTheProducts(trimmed, setListResult, productsRef);

                if (!searchResultVisible) {
                    setSearchResultVisible(true);
                }
            }
            else {
                if (searchResultVisible) {
                    setSearchResultVisible(false);
                }
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

                        <select value={sortingPriceType} onChange={handleSortingProductList}>
                            <option value="toHigh">Price: Low to High</option>
                            <option value="toLow">Price: High to Low</option>
                            <option value="default">Sort Products</option>
                        </select>
                        <img src='/sort_product_icon_.png' />
                    </form>
                </div>

            </div>
        )
    }

    export default SearchAndFilterInputs