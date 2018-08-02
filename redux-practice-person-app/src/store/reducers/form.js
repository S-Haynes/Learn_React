import * as actions from '../actions/actionTypes';

const initialState = {
    newName: '',
    newAge: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type){
    case actions.CHANGE_NAME:
      return {
        ...state,
        newName: action.payload.target.value
      }
    case actions.CHANGE_AGE:
      return {
        ...state,
        newAge: action.payload.target.value
      }
    default: 
       return state;  
  }
}

export default reducer