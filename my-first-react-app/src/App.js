import React, { Component } from 'react';
import './App.css';
import Text from './components/Text'

class App extends Component {

  state = {
    text: '',
    correctPass: false
  }

textChangeHandler = (event) => {
    this.setState({
      text: event.target.value,
    }, this.passCheckHandler);
 
}

passCheckHandler = () => {
let passCheck = [...this.state.correctPass]
 if(this.state.text === 'puppies'){
      passCheck = true;
      this.setState({
        correctPass: passCheck
      });
    } else {
      passCheck = false;
      this.setState({
        correctPass: passCheck
      });
    }
    console.log(this.state.text)
}


  render() {

    return (
      <div className="App">
      <Text textChangeHandler={this.textChangeHandler} text={this.state.text} /> 
      {this.state.correctPass === true ? 
      <div>
        <p>You typed the right password!</p> 
        <img src="https://images.pexels.com/photos/39317/chihuahua-dog-puppy-cute-39317.jpeg?auto=compress&cs=tinysrgb&h=350" alt="puppy"/>
      </div>
      : null}
      </div>
   );
  } 
}

export default App;