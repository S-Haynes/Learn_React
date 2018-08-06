import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const getOrders = () => dispatch => {
  let orders = []
  dispatch(setLoading());
   axios
    .get('/orders.json')
    .then(res => {
      for(let key in res.data){
        orders.push({
          id: key,
          ...res.data[key]
        })
      }
    })
    .then(res => {
      dispatch(setOrders(orders));
    })
    
    .catch(err => {
      dispatch(setOrdersError(err));
    });
} 

export const setOrders = (orders) => {
  return {
    type: actionTypes.SET_ORDERS,
    orders: orders
  }
}

export const setOrdersError = (error) => {
  return {
    type: actionTypes.SET_ORDERS_ERROR,
    error: error
  }
}

export const setLoading = () => {
  return {
    type: actionTypes.SET_LOADING
  }
}

export const placeOrderInit = (order) => dispatch => {
  dispatch(setLoading());
  axios.post('/orders.json', order)
       .then(res => {
        dispatch(placeOrder(order))
       })
       .catch(error => {
        dispatch(placeOrderError(error))
       })
}
export const placeOrder = (order) => {
  return {
    type: actionTypes.PLACE_ORDER,
    order: order
  }
}

export const placeOrderError = (error) => {
  return {
    type: actionTypes.PLACE_ORDER_ERROR,
    error: error
  }
}