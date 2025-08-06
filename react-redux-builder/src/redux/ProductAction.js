export const SET_PRODUCTS = 'SET_PRODUCTS';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const REQUEST_START = 'REQUEST_START';
export const REQUEST_FAILURE = 'REQUEST_FAILURE';

const API_URL = 'http://localhost:3000/products';


export const setProducts = (products) => ({
  type: SET_PRODUCTS,
  payload: products,
});

export const addProductSuccess = (product) => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: product,
});

export const updateProductSuccess = (product) => ({
  type: UPDATE_PRODUCT_SUCCESS,
  payload: product,
});

export const deleteProductSuccess = (id) => ({
  type: DELETE_PRODUCT_SUCCESS,
  payload: id,
});

export const requestStart = () => ({
  type: REQUEST_START,
});

export const requestFailure = (error) => ({
  type: REQUEST_FAILURE,
  payload: error,
});


export const getAllProducts = () => {
  return async (dispatch) => {
    dispatch(requestStart());
    try {
     
      const data = [
        { id: 1, name: 'Laptop', price: 1200, remarks: 'A high-performance laptop.' },
        { id: 2, name: 'Smartphone', price: 800, remarks: 'Latest model with a great camera.' },
        { id: 3, name: 'Headphones', price: 150, remarks: 'Noise-cancelling wireless headphones.' },
      ];
      dispatch(setProducts(data));
    } catch (error) {
      dispatch(requestFailure(error.message));
      console.error('Error fetching products:', error);
    }
  };
};

export const addProduct = (newProduct) => {
  return async (dispatch) => {
    dispatch(requestStart());
    try {
      
      const addedProduct = { ...newProduct, id: Date.now() };
      dispatch(addProductSuccess(addedProduct));
    } catch (error) {
      dispatch(requestFailure(error.message));
      console.error('Error adding product:', error);
    }
  };
};

export const updateProduct = (id, updatedProduct) => {
  return async (dispatch) => {
    dispatch(requestStart());
    try {
    
      const productToUpdate = { id, ...updatedProduct };
      dispatch(updateProductSuccess(productToUpdate));
    } catch (error) {
      dispatch(requestFailure(error.message));
      console.error('Error updating product:', error);
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    dispatch(requestStart());
    try {
    
      dispatch(deleteProductSuccess(id));
    } catch (error) {
      dispatch(requestFailure(error.message));
      console.error('Error deleting product:', error);
    }
  };
};
