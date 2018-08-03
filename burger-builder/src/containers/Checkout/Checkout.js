import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Burger/Order/CheckoutSummary';
import CheckoutForm from './CheckoutForm/CheckoutForm';
import { connect } from 'react-redux';

class Checkout extends Component {
 
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
        ingredients={this.props.ingredients}/>
        <Route path={this.props.match.path + "/contact-form"} render={() => (<CheckoutForm ingredients={this.props.ingredients} />)} />
      </div>
     
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients
  }
}



export default connect(mapStateToProps)(Checkout);