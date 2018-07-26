import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

class BurgerBuilder extends Component {
  state = {
    ingredients: [
      {type: 'salad', quantity: 0, price: 0.50},
      {type: 'bacon', quantity: 0, price: 0.60},
      {type: 'cheese', quantity: 0, price: 0.40},
      {type: 'meat', quantity: 0, price: 1.30}
    ],

    totalPrice: 4,
    purchasing: false
  }

  checkQuantityHandler = (type) => {
    const ingredients = [...this.state.ingredients]

    let ingredientIndex = ingredients.findIndex(ingredient => {
      return type === ingredient.type
    });
      
    return ingredients[ingredientIndex].quantity <= 0
  }

  addIngredientHandler = (type) => {
    let ingredients = [...this.state.ingredients]
    let price = {...this.state}

    const currentIngredient = ingredients.filter((ingredient => {
      return ingredient.type === type;
    }))
    
    currentIngredient[0].quantity++
    let newPrice = price.totalPrice + currentIngredient[0].price
    this.setState({ingredients: ingredients, totalPrice: newPrice})
    this.checkQuantityHandler(type);
  }

  removeIngredientHandler = (type) => {
    let ingredients = [...this.state.ingredients];
    let price = {...this.state};
    
    const currentIngredient = ingredients.filter((ingredient => {
      return ingredient.type === type;
    }));

    if(currentIngredient[0].quantity > 0){
        let newPrice = price.totalPrice - currentIngredient[0].price
        currentIngredient[0].quantity--
        this.setState({ingredients: ingredients, totalPrice: newPrice})
    };  

    this.checkQuantityHandler(type)
    }

    purchasingHandler = () => {
      this.setState({purchasing: true})
    }

    cancelPurchaseHandler = () => {
      this.setState({purchasing: false})
    }

    continuePurchaseHandler = () => {
      alert('You continued the purchase')
    }

	render () {


		return (
				<div>
          <Modal show={this.state.purchasing} 
                 cancel={this.cancelPurchaseHandler}> 
            <OrderSummary price={this.state.totalPrice} 
                          continue={this.continuePurchaseHandler}
                          cancel={this.cancelPurchaseHandler} 
                          ingredients={this.state.ingredients}/>
          </Modal>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls purchase={this.purchasingHandler} 
                         price={this.state.totalPrice} 
                         ingredients={this.state.ingredients} 
                         removeIngredient={this.removeIngredientHandler} 
                         addIngredient={this.addIngredientHandler}  />
				</div>	
			)
	}
}

export default BurgerBuilder