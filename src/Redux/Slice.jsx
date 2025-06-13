import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  productData: [],
  status: "idle",
  catData: [],
  searchData: [],
  CatProdData: [],
  cartData: JSON.parse(localStorage.getItem("cartData")) || [],
};

export const products = createAsyncThunk("products", async () => {
  let res = await axios.get(`https://dummyjson.com/products?limit=200`);
  return res.data.products;
});

export const categories = createAsyncThunk("categories", async () => {
  let res = await axios.get(`https://dummyjson.com/products/categories`);
  return res.data;
});

export const search = createAsyncThunk("search", async (name) => {
  let res = await axios.get(`https://dummyjson.com/products/search?q=${name}`);
  return res.data;
});

export const categoryProd = createAsyncThunk("categoryProd", async (slug) => {
  let res = await axios.get(`https://dummyjson.com/products/category/${slug}`);
  return res.data;
});

export const Slice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToCart: (state, action) => {
        const { product, quantity } = action.payload;
  
        // Check if the product already exists in the cart
        const existingProductIndex = state.cartData.findIndex(
          (item) => item.product.id === product.id
        );
  
        if (existingProductIndex !== -1) {
          // If product exists, update the quantity
          state.cartData[existingProductIndex].quantity = quantity;
        } else {
          // If product does not exist, add it to the cart
          state.cartData.push({ product, quantity });
        }
  
        // Update local storage
        localStorage.setItem('cartData', JSON.stringify(state.cartData));
        toast.success("Item added to cart")
      },
      removeFromCart: (state, action) => {
        const productId = action.payload;
        const removeIndex = state.cartData.findIndex(
          (item) => item.product.id === productId
        );
        if (removeIndex !== -1) {
          state.cartData.splice(removeIndex, 1);
          localStorage.setItem("cartData", JSON.stringify(state.cartData));
          toast.success("Item removed from cart")
        }
      }
      
  },
  extraReducers: (builder) => {
    builder
      .addCase(products.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(products.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.productData = payload;
      })
      .addCase(products.rejected, (state, action) => {
        state.status = "idle";
      })

      .addCase(categories.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(categories.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.catData = payload;
      })
      .addCase(categories.rejected, (state, action) => {
        state.status = "idle";
      })

      .addCase(search.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(search.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.searchData = payload.products;
      })
      .addCase(search.rejected, (state, action) => {
        state.status = "idle";
      })

      .addCase(categoryProd.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(categoryProd.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.CatProdData = payload.products;
      })
      .addCase(categoryProd.rejected, (state, action) => {
        state.status = "idle";
      });
  },
});

export const{addToCart,removeFromCart}=Slice.actions