import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async ({ category, limit, skip }) => {
    
        let url = (category && category !== "all")
            ? `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`
            : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

        const response = await axios.get(url);
        return response.data;
    }
);

export const fetchCategories = createAsyncThunk(
    "products/fetchCategories",
    async () => {
        const response = await axios.get(
            "https://dummyjson.com/products/categories"
        );
        return response.data;
    }
);

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        categories: [],
        totalProducts: 0,
        loading: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
                state.totalProducts = action.payload.total;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                const data = action.payload;
                if(data || data?.length > 0){
                    state.categories = data.map(cat => typeof cat === 'string' ? cat : cat.slug);  
                }
            })
    },
});

export default productSlice.reducer;