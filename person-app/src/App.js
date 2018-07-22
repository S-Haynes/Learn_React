import React, { Component } from 'react';
import Persons from './Components/Persons/Persons'
import './App.css';

class App extends Component {

  state = {
    persons:
    [
    {id:'dadas1', name: 'Bob', age: 25},
    {id:'dadas2', name: 'Jenny', age: 26},
    {id:'dadas3', name: 'Sally', age: 27}
    ],
    show: true
  }
    
   nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
        return p.id === id;
    })
    
    const person = {
      ...this.state.persons[personIndex]
    }

    person.name = event.target.value;

    const persons = [...this.state.persons]

    persons[personIndex] = person;

    this.setState({
      persons: persons
    })

   } 

  deletePersonHandler = (id) => {
    const persons = [...this.state.persons]

    const newPersons = persons.filter((person) => {
      return person.id !== id;
    })

    this.setState({
      persons: newPersons
    })
  }

  toggleHandler = () => {
    this.setState({
      show: !this.state.show
    })
  }

  render() {
      let persons = null;
      const style = {
       backgroundColor: 'green',
       color: 'white',
      }

       if(this.state.show) {
        persons = <Persons 
          clicked={this.deletePersonHandler}
          changed={this.nameChangeHandler}
          persons={this.state.persons}/>
        style.backgroundColor = 'red'
      }
   
   
    return (
      <div className="App">
      <h1>I'm a React App</h1>
      <button style={style} onClick={this.toggleHandler}>Toggle Persons</button>
      {persons}
      </div>
    );
  }
}

export default App;
