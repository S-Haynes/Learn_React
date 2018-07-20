import React from 'react';

const Text = (props) => {
	return (
		<div>
			<h1>Hi, I'm a component. Can you guess the password?</h1>
			<h6>The password is 'puppies', trust me.</h6>
			<input type="text" value={props.text} onChange={props.textChangeHandler}/>
			<h3>You're Updating the state here:</h3>
			<h4>{props.text}</h4>
		</div>	
		)
}

export default Text;