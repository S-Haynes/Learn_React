import React from 'react';
import Button from '../../UI/Button/Button';
import Burger from '../Burger';

const checkoutSummary = (props) => {
  return (
    <div style={{textAlign: 'center'}}>
      <h1>The most delicious burger ever!</h1>
      <Burger ingredients={props.ingredients}/>
      <Button clicked={props.continue} btnType="Success">Continue</Button>
      <Button clicked={props.cancel} btnType="Danger">Cancel</Button>
    </div>
  
  )
}

export default checkoutSummary