import {useContext, useState} from 'react';
import MyAllContext from "../../contextProviders/MyContextProvider";
import { getDocs, query, Query, FirestoreError, orderBy, startAt, endAt } from 'firebase/firestore';
import {db} from '../../../firebase';
import { Product } from '../../models/Product'

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


//  Function To Find And Fetch Data Which Is Searched //
export const searchTheProducts = (
    searchingWord : string,
    setListResult: (newValue: AllProducts[]) => void,
    productsRefs: any) => {
        
    
    if (!searchingWord){
        return "arama çubuğu boş";
    }

    let productsResult: any[] = [];
    
    try{    
        // create query to find results before pull datas //
        const searchingQuery : Query<AllProducts> = query(
            productsRefs,   // collection that has been selected
            orderBy("title"),   // search based on which specs
            startAt(searchingWord),   // title must start with input word
            endAt(searchingWord + "\uf8ff")     // ignore remaining letters
    );
        
        // .then(querySnapshot => {
            
        //     // let productsResult: any[] = [];
        //     querySnapshot.forEach((item) => (
            
        //         productsResult.push(item.data() as AllProducts)
        //     ))
        //     return productsResult;
        // })
        getDocs(searchingQuery)
        .then(querySnapshot => {
            console.log("QUERY'DEN DÖNEN SONUÇ : ", querySnapshot.docs)
            let foundProducts: AllProducts[] = querySnapshot.docs.map((item) => {
                
                let eachProduct = item.data() as AllProducts; 
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
            console.log("QUERY'DEN DÖNENLERİN TOPLAMI : ",foundProducts)
            return foundProducts;
        })
        .then(allSearchResult => {
            setListResult(allSearchResult);
            console.log(">>> allSearchResult : ",allSearchResult);
        })
    } catch{ (error: FirestoreError) => {
            if (error){
                console.log("ürünler güncellenemedi",error.message);
            }
            else {
                console.log("ürünler güncellenemedi : ",error);
            }
        }
    }
    console.log("SEARCH FUNC() ÇALIŞTI VE BİTİP DÖNDÜRDÜ : ",productsResult);
    return productsResult;
}




// export const searchTheProducts = (searchBarValue : string, setSearchBarValue: (value: string) => void) : string => {
    
//     // const contextVariables = useContext(MyAllContext);
//     // const contextVariables = useContext(MyAllContext) ?? { /* default values */ };


//     // const {auth, user, isLogging, loadingState, setLoadingState,  searchBarValue, setSearchBarValue, searchResultVisible, setSearchResultVisible} = contextVariables;

//     // let selectedItemsForListing : string "";

//     if (!searchBarValue) {
//         return "ürün listesi listelenemedi çünkü boş";
//     }

//     setSearchBarValue(searchBarValue);
//         // let filteredProducts = allProduct.filter(item: any => item.title === this.searchBarValue);  //
//         return "sfsdfasfsdfsf"
// }