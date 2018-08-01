import React from 'react';
import './Person.css'

const person = (props) => {
  return (
    <div onClick={props.clicked} className="Person">
      <p>My name is {props.name} and I am {props.age}</p>
    </div>
  )
}

export default person;