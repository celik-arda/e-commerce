export const getItemsFromSessionStorage = (item_key: string) => {

    return sessionStorage.getItem(`${item_key}`);
}
