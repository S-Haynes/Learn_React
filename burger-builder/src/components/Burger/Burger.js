import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredients/BurgerIngredient/BurgerIngredient'

const burger = (props) => {
  let transformedIngredients = props.ingredients
    .map(ingredient => {
      return [...Array(ingredient.quantity)].map((_, index) => {
          return <BurgerIngredient key={ingredient.type + index} type={ingredient.type} />
      }); 
    })
    .reduce((arr, el) => {
      return arr.concat(el)
    }, [])

    if(transformedIngredients.length === 0){
      transformedIngredients = <p>Please start adding ingredients!</p>
    } 
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top' />
        {transformedIngredients}
      <BurgerIngredient type='bread-bottom' />
    </div>
  );

}

export default burger;

