import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../withErrorHandler/withErrorHandler';


class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount () {
    axios.get('https://burger-builder-300ea.firebaseio.com/ingredients.json')
    .then(response => {
      this.setState({ingredients: response.data})
    })
    .catch(err => {
      this.setState({error: true})
    })
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
    let queryParams = []
    for(let i = 0; i < this.state.ingredients.length; i++){
      for(let j in this.state.ingredients[i]){
        queryParams.push(encodeURIComponent(j) + '=' + encodeURIComponent(this.state.ingredients[i][j]))
      }
    }
      let queryString = queryParams.join('&')

     this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
     })
     
    }

	render () {
    let orderSummary = null;
    let burger = this.state.error ? <p style={{width: '100%', textAlign: 'center'}}>Ingredients can't be Loaded!</p> : <Spinner />
    if(this.state.ingredients){
     burger = (
      <div>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls purchase={this.purchasingHandler} 
                       price={this.state.totalPrice} 
                       ingredients={this.state.ingredients} 
                       removeIngredient={this.removeIngredientHandler} 
                       addIngredient={this.addIngredientHandler}  />
      </div>
           )
         orderSummary =  <OrderSummary price={this.state.totalPrice} 
                          continue={this.continuePurchaseHandler}
                          cancel={this.cancelPurchaseHandler} 
                          ingredients={this.state.ingredients}/>
    }
    if(this.state.loading) {
      orderSummary = <Spinner />
    }
    

		return (
				<div>
          <Modal show={this.state.purchasing} 
                 cancel={this.cancelPurchaseHandler}> 
           {orderSummary}
          </Modal>
					{burger}
				</div>	
			)
	}
}

export default withErrorHandler(BurgerBuilder, axios)