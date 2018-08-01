import React from 'react';
import classes from './Input.css';

const input = (props) => {
  let inputEl = null;
  const inputClasses = [classes.InputEl];

  if(props.invalid && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch(props.elementType) {
    case('input'):
      inputEl = <input 
                onChange={props.changed} 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}/>;
      break;
    case('textarea'):
      inputEl = <textarea 
                onChange={props.changed} 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}/>;
      break;
    case('select'):
      inputEl = <select 
                onChange={props.changed} 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}> 
                {props.elementConfig.options.map(option => {
                    return <option key={option.value} value={option.value}>{option.displayValue}</option>
                })}
                </select>
      break;
    default:
      inputEl = <input 
                onChange={props.changed} 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}/>;
  }

  return (
    <div className={classes.Input}>
     <label className={classes.Label}>{props.label}</label>
     {inputEl}
    </div>
  )
}

export default input;