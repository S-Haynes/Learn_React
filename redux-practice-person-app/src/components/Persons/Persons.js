import React, { Component } from 'react';
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

  deletePersonHandler = (id) => {
    const persons = [...this.state.persons];

    const updatedPersons = persons.filter(person => {
      return person.id !== id;
    })

    this.setState({persons: updatedPersons});
  }

  updatePersonNameHandler = (e) => {
    let newState = [...this.state]
    let newName = newState.newName

    newName = e.target.value;

    this.setState({newName: newName})
    
  }
  updatePersonAgeHandler = (e) => {
      let newState = [...this.state]
      let newAge = newState.newAge

      newAge = e.target.value;
      
      this.setState({newAge: newAge})  
    }

  submitPersonHandler = (e) => {
    e.preventDefault();
    const updatedPersons = [
      ...this.state.persons,
      { 
        id: Math.random(),
        name: this.state.newName,
        age: this.state.newAge
      }
    ]

    this.setState({persons: updatedPersons, newName: '', newAge: ''})
  }

  render () {
    const personArr = this.state.persons.map(person => {
      return <Person key={person.id} clicked={this.deletePersonHandler.bind(this, person.id)} name={person.name} age={person.age} />
    })
    return (
      <div>
        {personArr}
        <form onSubmit={(e) => this.submitPersonHandler(e)}>
          <input type="text" onChange={(e) => this.updatePersonNameHandler(e)} placeholder="name" value={this.state.newName}/>  
          <input type="text" onChange={(e) => this.updatePersonAgeHandler(e)} placeholder="age" value={this.state.newAge}/>  
          <button>Submit!</button>
        </form>
      </div>
    )
  }
}

export default Persons;