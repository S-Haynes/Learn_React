import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
class BurgerBuilder extends Component {
  state = {
    ingredients: [
      {type: 'salad', quantity: 0, price: 0.50},
      {type: 'bacon', quantity: 0, price: 0.60},
      {type: 'cheese', quantity: 0, price: 0.40},
      {type: 'meat', quantity: 0, price: 1.30}
    ],

    totalPrice: 0
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
    console.log(newPrice)
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
        console.log(newPrice)
    };  

    this.checkQuantityHandler(type)

    }
  
  



	render () {

     let checkIngredients = this.state.ingredients.map(a => {return {...a}})

    for(let i = 0; i < checkIngredients.length; i++){
      checkIngredients[i].quantity = checkIngredients[i].quantity <= 0
    }

		return (
				<div>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls ingredients={this.state.ingredients} removeIngredient={this.removeIngredientHandler} addIngredient={this.addIngredientHandler}  />
				</div>	
			)
	}
}

export default BurgerBuilder