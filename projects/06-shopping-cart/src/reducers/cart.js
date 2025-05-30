
export const cartInitialState = JSON.parse(window.localStorage.getItem("cart")) || [];

export const CART_ACTION_TYPES = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    CLEAR_CART: 'CLEAR_CART',
};

// update localStorage with state for cart
export const updateLocalStorage = (state => {
    window.localStorage.setItem('cart', JSON.stringify(state));
})

const UPDATE_STATE_BY_ACTION = {
    [CART_ACTION_TYPES.ADD_TO_CART]:(state, action) => {
        const { id } = action.payload;
            const productInTheCartIndex = state.findIndex(
                (item) => item.id === id);

            if (productInTheCartIndex >= 0) {
                // USando structuredClone para clonar el array original y no modificarlo
                const newState = structuredClone(state);
                newState[productInTheCartIndex].quantity += 1;
                updateLocalStorage(newState);
                return newState;
            }

            const newState = [...state,
                {
                    ...action.payload, //product
                    quantity: 1
                }
            ];

            updateLocalStorage(newState);
            return newState;
    },
    [CART_ACTION_TYPES.REMOVE_FROM_CART]:(state, action) => {
        const { id } = action.payload;
        const newState = state.filter((item) => item.id !== id);
        updateLocalStorage(newState);
        return newState;
    },
    [CART_ACTION_TYPES.CLEAR_CART]:() => {
        updateLocalStorage([])
        return [];
    }
}

export const cartReducer = (state, action) => {
    const { type: actionType } = action;
    
    const updateState = UPDATE_STATE_BY_ACTION[actionType];
    return updateState ? updateState(state, action) : state;
}
