import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../withErrorHandler/withErrorHandler';
import * as ingredientActions from '../../store/actions/ingredientActions';
import { connect } from 'react-redux';


class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  }

  // componentDidMount () {
  //   axios.get('https://burger-builder-300ea.firebaseio.com/ingredients.json')
  //   .then(response => {
  //     this.setState({ingredients: response.data})
  //   })
  //   .catch(err => {
  //     this.setState({error: true})
  //   })
  // }


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
    if(this.props.ingredients){
     burger = (
      <div>
        <Burger ingredients={this.props.ingredients} />
        <BuildControls purchase={this.purchasingHandler} 
                       price={this.props.price} 
                       ingredients={this.props.ingredients} 
                       removeIngredient={this.props.removeIngredientHandler} 
                       addIngredient={this.props.addIngredientHandler}  />
      </div>
           )
         orderSummary =  <OrderSummary price={this.props.price} 
                          continue={this.continuePurchaseHandler}
                          cancel={this.cancelPurchaseHandler} 
                          ingredients={this.props.ingredients}/>
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

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    price: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addIngredientHandler: (ingName) => dispatch(ingredientActions.addIngredient(ingName)),
    removeIngredientHandler: (ingName) => dispatch(ingredientActions.removeIngredient(ingName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))