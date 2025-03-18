import {AllProducts} from '../../models/Product'



export const saveItemsToSessionStorage = (existing_session_data: null | string, product: AllProducts, storage_key:string): void => {
    
    let datasForPushing;

    if (existing_session_data === null) {
        // convert single data to array for sessionStorage to use easily //
        datasForPushing = [product]
        sessionStorage.setItem(`${storage_key}`, JSON.stringify(datasForPushing));
    }
    else if (existing_session_data) {
        const existingParsedData: AllProducts[] = JSON.parse(existing_session_data);
        datasForPushing = [...existingParsedData, product];
        sessionStorage.setItem(`${storage_key}`, JSON.stringify(datasForPushing));
    }
}

