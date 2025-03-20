import { getDocs, Query, DocumentData } from 'firebase/firestore';

// ---  TS Interface and Class Object  --- //
import {AllProducts, Product} from '../../models/Product.tsx';

export const createAndDisplayObjectsInUI = async(collection_ref: Query<DocumentData>,
 state_function: (newValue: AllProducts[]) => void
): Promise<AllProducts[]> => {

    const querySnapshot = await getDocs(collection_ref);

    // create inheritence-based products //
    let foundProducts : AllProducts[]= querySnapshot.docs.map((item) => {
                    
        // handle the raw firestore-data //
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
    // update state which displays products in UI //
    state_function(foundProducts);
    return foundProducts;
}