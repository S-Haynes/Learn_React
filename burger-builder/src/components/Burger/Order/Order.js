import React from 'react';
import classes from './Order.css';

const order = (props) => {
  const ingredients = [];
  for(let key in props.ingredients){
    ingredients.push({
      type: key,
      quantity: props.ingredients[key]
    })
  }

 const ingredient = ingredients.map(ingredient => {
    return <span className={classes.Ingredient} key={ingredient.type}>{ingredient.type}: {ingredient.quantity}</span>
    
  })

  return (
    <div className={classes.Order}>
    <p className={classes.Wrapper}> Ingredients: {ingredient} </p>
    <p>Total Price: ${props.price.toFixed(2)}</p>
    <p>Customer: {props.customer} </p>
    </div>

  )
}

export default order;