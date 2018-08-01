import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Burger/Order/CheckoutSummary';
import CheckoutForm from './CheckoutForm/CheckoutForm'

class Checkout extends Component {
  state = {
    ingredients: null
  }
  
  componentWillMount(){

    const query = new URLSearchParams(this.props.location.search);
    
    let ingredientsArr = [];
    let ingredientsArr2 = [];
    for(let param of query.entries()){
      let ingredients = {};
      if(param[0] === 'type'){
         ingredients[param[0]] = param[1]
         ingredientsArr.push(ingredients)
       } else {
         ingredients[param[0]] = +param[1]
         ingredientsArr.push(ingredients)
       }  
    }
    
    for(let i = 0; i <= ingredientsArr.length; i++){
      let splice = ingredientsArr.splice(0, 3)
      ingredientsArr2.push(Object.assign({}, ...splice))
    }
    
    this.setState({
      ingredients: ingredientsArr2
    })
  }

  cancelPurchaseHandler = () => {
    this.props.history.goBack();
  }

  continuePurchaseHandler = () => {
    this.props.history.replace('/checkout/contact-form')
  }

  render () {
    return (
      <div>
        <CheckoutSummary 
        continue={this.continuePurchaseHandler} 
        cancel={this.cancelPurchaseHandler} 
        ingredients={this.state.ingredients}/>
        <Route path={this.props.match.path + "/contact-form"} render={() => (<CheckoutForm ingredients={this.state.ingredients} />)} />
      </div>
     
    )
  }
}

export default Checkout;