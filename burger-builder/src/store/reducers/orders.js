import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  error: false,
  purchased: false
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.SET_ORDERS:
      return {
        ...state,
        orders: action.orders,
        loading: false,
        purchased: false
      }
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: true
      }
    case actionTypes.SET_ORDERS_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false
      }
      case actionTypes.PLACE_ORDER:
      return {
        ...state,
        orders: [action.order, ...state.orders],
        loading: false,
        purchased: true
      }
      case actionTypes.PLACE_ORDER_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    default:
      return state;
  }
}

export default reducer;