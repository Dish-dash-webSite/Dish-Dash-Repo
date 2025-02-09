import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../types/index"

const apiUrl = "http://localhost:3000/api/owner"
export const fetchProducts = createAsyncThunk<Product[]>(
    'products/fetchProducts',
    async () => {
        const response = await axios.get(apiUrl);
        return response.data;
    }
);

// Update a product
export const updateProduct = createAsyncThunk<Product, Product>(
    'products/updateProduct',
    async (product) => {
        const response = await axios.put(`${apiUrl}/${product.id}`, product);
        return response.data;
    }
);

// Delete a product
export const deleteProduct = createAsyncThunk<number, number>(
    'products/deleteProduct',
    async (id) => {
        await axios.delete(`${apiUrl}/${id}`);
        return id;
    }
);