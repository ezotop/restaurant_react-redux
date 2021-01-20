const menuLoaded = (newMenu) => {
    return {
        type: 'MENU_LOADED',
        payload: newMenu
    }
};

const menuRequested = () => {
    return {
        type: 'MENU_REQUESTED'
    }
};

const menuError = () => {
    return {
        type: 'MENU_ERROR'
    }
};

const addedToCart = (id) => {
    return {
        type: 'ITEM_ADD_TO_CART',
        payload: id
    }
};

const deleteFromCart = (id) => {
    return {
        type: 'ITEM_REMOVE_FROM_CART',
        payload: id
    }
};

const changeQuantity = (id, qty) => {
    return {
        type: 'CHANGED_ITEM_QTY',
        payload: id,
        quantity: qty
    }
};

const incQty = (id) => {
    return {
        type: 'INC_QTY',
        payload: id
    }
};

const decQty = (id) => {
    return {
        type: 'DEC_QTY',
        payload: id
    }
};

export {
    menuLoaded,
    menuRequested,
    menuError,
    addedToCart,
    deleteFromCart,
    changeQuantity,
    incQty,
    decQty
};