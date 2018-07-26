import React from 'react';
import classes from './OrderSummary.css';
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
  const ingredients = props.ingredients.map(ingredient => {
    return <li key={ingredient.type}>{ingredient.type}: {ingredient.quantity}</li>
  })

  return ( 
      <div className={classes.OrderSummary}>
        <h2>Your Order</h2>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredients}
        </ul>
        <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
        <div className={classes.Center}>
          <Button clicked={props.continue} btnType='Success'> Checkout </Button> 
          <Button clicked={props.cancel} btnType='Danger'> Cancel </Button> 
        </div>
       
      </div>
  )
}

export default orderSummary;