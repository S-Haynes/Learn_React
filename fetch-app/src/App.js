import React, { Component } from 'react';
import Posts from './components/Posts/Posts'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
       <main>
         <Posts />
       </main>
      </div>
    );
  }
}

export default App;
