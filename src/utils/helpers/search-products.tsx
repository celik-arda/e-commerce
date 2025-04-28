import { getDocs, query, Query, FirestoreError, orderBy, startAt, endAt } from 'firebase/firestore';
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
        return;
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
        
        getDocs(searchingQuery)
        .then(querySnapshot => {

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

            return foundProducts;
        })
        .then(allSearchResult => {

            setListResult(allSearchResult);
        })
    } catch{ (error: FirestoreError) => {
            if (error){
                return <h2>`products couldn't be updated (${error.message})`</h2>
            }
            else {
                return <h2>`something's wrong`</h2>;
            }
        }
    }

    return productsResult;
}