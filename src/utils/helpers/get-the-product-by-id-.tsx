import {useContext} from 'react'
import MyAllContext from '../../contextProviders/MyContextProvider'
import {AllProducts} from '../../models/Product'

// detect which product user clicked and return its id //
export const getTheProductById= (allProducts:
    AllProducts[],
    itemLinkId: string,
) => {


    const clickedProduct = allProducts.filter(singleItem => ((singleItem.id).toString() == itemLinkId))

    return clickedProduct;
}
