import React, { Component } from 'react';
import { connect } from 'react-redux'
import Person from './Person/Person';

class Persons extends Component {
  state = {
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

  render () {
    const personArr = this.props.persons.map(person => {
      return <Person key={person.id} clicked={this.props.deletePersonHandler.bind(this, person.id)} name={person.name} age={person.age} />
    })
    return (
      <div>
        {personArr}
        <form onSubmit={(e) => this.props.submitPersonHandler(e)}>
          <input type="text" onChange={(e) => this.props.updatePersonNameHandler(e)} placeholder="name" value={this.props.newName}/>  
          <input type="text" onChange={(e) => this.props.updatePersonAgeHandler(e)} placeholder="age" value={this.props.newAge}/>  
          <button>Submit!</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    newName: state.newName,
    newAge: state.newAge,
    persons: state.persons
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePersonNameHandler: (e) => dispatch({type:'CHANGE_NAME', payload: e}),
    updatePersonAgeHandler: (e) => dispatch({type:'CHANGE_AGE', payload: e}),
    submitPersonHandler: (e) => dispatch({type:'ADD_PERSON', payload: e}),
    deletePersonHandler: (id) => dispatch({type:'DELETE_PERSON', payload: id})
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Persons);