import React from 'react';
import './Person.css';

const person = (props) => {
	return (
		<div className="Person">
			<p onClick={props.deletePersonHandler}> Hi I'm {props.name} and I am {props.age} years old</p>
			<input type="text" value={props.name} onChange={props.nameChangeHandler}/>
		</div>
		
		)
}

export default person