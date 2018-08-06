import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
 
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.ADD_INGREDIENT:
      const index_add = state.ingredients.findIndex(ingredient => {
          return ingredient.type === action.ingName
      })
      return {
        ...state,
        ingredients: [
        ...state.ingredients,
        ...state.ingredients[index_add],
        ...state.ingredients[index_add].quantity++
        ],
        totalPrice: state.totalPrice + state.ingredients[index_add].price
        }
    case actionTypes.REMOVE_INGREDIENT:
    const index_remove = state.ingredients.findIndex(ingredient => {
          return ingredient.type === action.ingName
      })
      return {
         ...state,
        ingredients: [
        ...state.ingredients,
        ...state.ingredients[index_remove],
        ...state.ingredients[index_remove].quantity--
        ],
        totalPrice: state.totalPrice - state.ingredients[index_remove].price
    }
    case actionTypes.SET_INGREDIENTS: 
      return {
        ...state,
        ingredients: action.payload,
        error: false,
        totalPrice: 4
      }
    case actionTypes.SET_INGREDIENTS_ERROR: 
      return {
        ...state,
        error: true
      }
    default:
     return state
  } 

}


export default reducer;