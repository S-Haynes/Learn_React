import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl'


const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
]

const buildControls = (props) => {
 
  let disabled = null;
  if(props.price <= 4){
    disabled = true;
  } else {
    disabled = false;
  }

  return ( 
      <div className={classes.BuildControls}>
         <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
        {controls.map(control => {
          return <BuildControl ingredients={props.ingredients} remove={props.removeIngredient.bind(this, control.type)} add={props.addIngredient.bind(this, control.type)} key={control.label} label={control.label} type={control.type} />
        })}
        <button disabled={disabled} className={classes.OrderButton} onClick={props.purchase}>ORDER NOW</button>
      </div>
  )
}

export default buildControls;