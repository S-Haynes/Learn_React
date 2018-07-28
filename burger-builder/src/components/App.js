import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Layout from '../containers/Layout/Layout';
import BurgerBuilder from '../containers/BurgerBuilder/BurgerBuilder';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
       <Layout>
        <Route path="/checkout" render={() => (<h1>you reached the checkout route!</h1>)}/> 
        <Route path="/" exact component={BurgerBuilder}/> 
       </Layout>
      </div>
    );
  }
}

export default App;
