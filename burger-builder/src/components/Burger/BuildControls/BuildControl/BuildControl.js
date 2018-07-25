import React from 'react';
import classes from './BuildControl.css';

const buildControl = (props) => {
  
    let disable = null;

    const ingredientIndex = props.ingredients.findIndex(ingredient => {
          return ingredient.type === props.type;
    });

    if(props.ingredients[ingredientIndex].quantity === 0){
      disable = true;
    } else {
      disable = false;
    }

  return (
      <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less} onClick={props.remove} disabled={disable}>Less</button>
        <button className={classes.More} onClick={props.add}>More</button>
      </div>
    )
}

export default buildControl;

