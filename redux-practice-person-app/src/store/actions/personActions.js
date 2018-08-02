import * as actions from './actionTypes'

export const changeName = (e) => {
  return {
    type: actions.CHANGE_NAME,
    payload: e
  }
}

export const changeAge = (e) => {
  return {
    type: actions.CHANGE_AGE,
    payload: e
  }
}

export const addPerson = (e, newName, newAge) => {
  return {
    type: actions.ADD_PERSON,
    payload: e,
    newName: newName,
    newAge: newAge
  }
}

export const deletePerson = (id) => {
  return {
    type: actions.DELETE_PERSON,
    payload: id
  }
}


