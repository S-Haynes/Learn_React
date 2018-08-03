import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingName: ingName
  }
}

export const removeIngredient = (ingName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingName: ingName
  }
}

export const getIngredients = () => dispatch => {
  axios.get('https://burger-builder-300ea.firebaseio.com/ingredients.json')
    .then(response => {
      dispatch(setIngredients(response.data))
    })
    .catch(err => {
      dispatch(setIngredientsError(err))
    })
}

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    payload: ingredients
  }
}

export const setIngredientsError = (err) => {
  return {
    type: actionTypes.SET_INGREDIENTS_ERROR,
    payload: err
  }
}
