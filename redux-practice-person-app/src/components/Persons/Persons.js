import React, { Component } from 'react';
import { connect } from 'react-redux';
import Person from './Person/Person';
import * as actions from '../../store/actions';

class Persons extends Component {
 
  render () {
    const personArr = this.props.persons.map(person => {
      return <Person key={person.id} 
                     clicked={this.props.deletePersonHandler.bind(this, person.id)} 
                     name={person.name} 
                     age={person.age} />
    });
    return (
      <div>
        {personArr}
        <form onSubmit={(e) => this.props.submitPersonHandler(e, this.props.newName, this.props.newAge)}>
          <input type="text" 
                 onChange={(e) => this.props.updatePersonNameHandler(e)} 
                 placeholder="name" 
                 value={this.props.newName}/>  
          <input type="text" 
                 onChange={(e) => this.props.updatePersonAgeHandler(e)} 
                 placeholder="age" 
                 value={this.props.newAge}/>  
          <button>Submit!</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    newName: state.form.newName,
    newAge: state.form.newAge,
    persons: state.persons.persons
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePersonNameHandler: (e, newName) => dispatch({type: actions.CHANGE_NAME, payload: e}),
    updatePersonAgeHandler: (e, newAge) => dispatch({type: actions.CHANGE_AGE, payload: e}),
    submitPersonHandler: (e, newName, newAge) => dispatch({type: actions.ADD_PERSON, payload: e, newName: newName, newAge: newAge}),
    deletePersonHandler: (id) => dispatch({type: actions.DELETE_PERSON, payload: id})
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Persons);