import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients: [
  {type: 'salad', quantity: 0, price: 0.5},
  {type: 'bacon', quantity: 0, price: 0.6},
  {type: 'cheese', quantity: 0, price: 0.4},
  {type: 'meat', quantity: 0, price: 1.3}
  ],
  totalPrice: 4
}

const reducer = (state = initialState, action) => {
  const index = state.ingredients.findIndex(ingredient => {
          return ingredient.type === action.ingName
      })

  switch(action.type){
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [
        ...state.ingredients,
        ...state.ingredients[index].quantity++  
        ],
        totalPrice: state.totalPrice + state.ingredients[index].price
        }
    case actionTypes.REMOVE_INGREDIENT:
      return {
         ...state,
        ingredients: [
        ...state.ingredients,
        ...state.ingredients[index].quantity--  
        ],
        totalPrice: state.totalPrice - state.ingredients[index].price
    }
    default:
     return state
  } 

}


export default reducer;