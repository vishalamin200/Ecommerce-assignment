import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        isCartOpen: false,
        items: [],
        totalQuantity: 0,
        totalAmount: 0, 
    },
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);

            state.totalQuantity++;
            state.totalAmount += newItem.price;

            if (!existingItem) {
                state.items.push({ ...newItem, quantity: 1 });
            } else {
                existingItem.quantity++;
            }
        },
        decreaseQuantity(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);

            if (existingItem) {
                state.totalQuantity--;
                state.totalAmount -= existingItem.price;

                if (existingItem.quantity === 1) {
                    state.items = state.items.filter(item => item.id !== id);
                } else {
                    existingItem.quantity--;
                }
            }
        },
        removeItem(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);

            if (existingItem) {
                state.totalQuantity -= existingItem.quantity;
                state.totalAmount -= (existingItem.price * existingItem.quantity);
                state.items = state.items.filter(item => item.id !== id);
            }
        },
        setIsCartOpen(state,action){
            state.isCartOpen = action.payload
        }
    }
});

export const { addToCart, decreaseQuantity, removeItem, setIsCartOpen } = cartSlice.actions;
export default cartSlice.reducer;