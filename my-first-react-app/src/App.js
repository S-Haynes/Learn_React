import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Text from './components/Text'

class App extends Component {

  state = {
    text: ''
  }

  textChangeHandler = (event) => {
    this.setState({
      text: event.target.value
    })
  }
  render() {
    return (
      <div className="App">
      <Text textChangeHandler={this.textChangeHandler} text={this.state.text} />
      </div>
   );
  } 
}

export default App;