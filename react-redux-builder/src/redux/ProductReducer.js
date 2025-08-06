import { 
  SET_PRODUCTS, 
  ADD_PRODUCT_SUCCESS, 
  UPDATE_PRODUCT_SUCCESS, 
  DELETE_PRODUCT_SUCCESS,
  REQUEST_START,
  REQUEST_FAILURE
} from './ProductAction';

const initialProductState = {
  products: [],
  loading: false,
  error: null,
};

export const productReducer = (state = initialProductState, action) => {
  switch (action.type) {
    case REQUEST_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
      
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        products: [...state.products, action.payload],
        loading: false,
      };
      
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        ),
        loading: false,
      };
      
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload),
        loading: false,
      };
      
    case REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
