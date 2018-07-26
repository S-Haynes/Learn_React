import React from 'react';
import classes from './OrderSummary.css';

const orderSummary = (props) => {
  const ingredients = props.ingredients.map(ingredient => {
    return <li key={ingredient.type}>{ingredient.type}: {ingredient.quantity}</li>
  })

  return ( 
      <div>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredients}
        </ul>
        <button>Checkout</button>
        <button onClick={props.cancel}>Cancel</button>
      </div>
  )
}

export default orderSummary;