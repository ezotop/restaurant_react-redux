const initialState = {
    menu: [],
    loading: true,
    error: false,
    items: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MENU_LOADED':
            return {
                ...state, // Повторяем state, чтобы не потерять, то что мы не затрагиваем
                menu: action.payload,
                loading: false,
            };
        case 'MENU_REQUESTED':
            return {
                ...state,
                loading: true,
            };
        case 'MENU_ERROR':
            return {
                ...state,
                loading: false,
                error: true,
            };
        case 'ITEM_ADD_TO_CART':
            const id = action.payload;

            const indx = state.items.findIndex(elem => elem.id === id);
            let newItem;

            if (indx === -1) {
                const item = state.menu.find(item => item.id === id);
                newItem = {
                    title: item.title,
                    url: item.url,
                    price: item.price,
                    id: item.id,
                    qty: 1
                };
                return {
                    ...state,
                    items: [
                        ...state.items, // Чтобы не удалились предыдущие добавленные
                        newItem
                    ]
                };
            }
            
            state.items[indx].qty += 1;
            return {
                ...state
            };
        case 'ITEM_REMOVE_FROM_CART':
            const index = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === index);
            const newItems = [...state.items.slice(0, itemIndex), ...state.items.slice(itemIndex + 1)];

            return {
                ...state,
                items: newItems
            };
        case 'CHANGED_ITEM_QTY':
            console.log(`Action: ${action.quantity}`);
            console.log(action.payload);
            const quantity = state.items.map(item => {
                if (item && item.id === action.payload) {
                    item.qty = +action.quantity
                    return item;
                }
                return item;
            });

            return {
                ...state,
                items: quantity
            };
        case 'INC_QTY':
            const increasedQtyItem = state.items.map(item => {
                if (item && item.id === action.payload) {
                    ++item.qty;
                    return item;
                }
                return item;
            });

            return {
                ...state,
                items: increasedQtyItem
            };
        case 'DEC_QTY':
            const decreasedQtyItem = state.items.map(item => {
                if (item && item.id === action.payload && item.qty > 1) {
                    --item.qty;
                    return item;
                }
                return item;
            });

            return {
                ...state,
                items: decreasedQtyItem
            };
        default:
            return state;
    }
};

export default reducer;