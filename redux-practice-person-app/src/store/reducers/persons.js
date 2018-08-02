import * as actions from '../actions';

const initialState = {
   persons: [
    {
      id: 32123,
      name: 'Bob',
      age: '28'
    },
    { 
      id: 321233223,
      name: 'Sally',
      age: '20'
    },
    { 
      id: 32123177,
      name: 'Joe',
      age: '16'
    },
    ],
}

const reducer = (state = initialState, action) => {
  switch (action.type){
    
    case actions.ADD_PERSON:
       action.payload.preventDefault();
        const updatedPersons = [
          ...state.persons,
        { 
          id: Math.random(),
          name: action.newName,
          age: action.newAge
        }
      ]
      return {
        ...state,
        persons: updatedPersons,
        newName: '',
        newAge: ''
      }
    case actions.DELETE_PERSON:
      const newPersons = state.persons.filter(person => {
        return person.id !== action.payload
      })
    return {
      ...state,
      persons: newPersons
    }
    default: 
       return state;
  }
 
}

export default reducer;