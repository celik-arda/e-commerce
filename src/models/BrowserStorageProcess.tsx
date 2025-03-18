//  Inhetance-Based Static Class For SessionStorage Functions //

import { getItemsFromSessionStorage } from "../utils/helpers/get-items-from-sessionStorage_.tsx";
import { saveItemsToSessionStorage } from "../utils/helpers/save-item-to-SesssionStorage_.tsx"


export class BrowserStorage {

    static saveItemsToSessionStorage = saveItemsToSessionStorage;
    static getItemsFromSessionStorage = getItemsFromSessionStorage;
}