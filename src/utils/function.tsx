export const addWishlistToLocalStorage = (data: any) => {
    const wishlist = getWishlistFromLocalStorage();
    wishlist.push(data);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

export const getWishlistFromLocalStorage = () => {
    const wishlist = localStorage.getItem('wishlist');
    if (wishlist) {
        return JSON.parse(wishlist);
    }
    return [];
}