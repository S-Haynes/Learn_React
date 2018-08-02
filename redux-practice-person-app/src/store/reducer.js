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
    newName: '',
    newAge: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type){
    case 'CHANGE_NAME':
      return {
        ...state,
        newName: action.payload.target.value
      }
    case 'CHANGE_AGE':
      return {
        ...state,
        newAge: action.payload.target.value
      }
    case 'ADD_PERSON':
       action.payload.preventDefault();
        const updatedPersons = [
          ...state.persons,
        { 
          id: Math.random(),
          name: state.newName,
          age: state.newAge
        }
      ]
      return {
        ...state,
        persons: updatedPersons,
        newName: '',
        newAge: ''
      }
    case 'DELETE_PERSON':
      const persons = [...state.persons]
      const newPersons = persons.filter(person => {
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