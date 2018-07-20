import React from 'react';

const Text = (props) => {
	return (
		<div>
			<input type="text" value={props.text} onChange={props.textChangeHandler}/>
			<p>{props.text}</p>
		</div>	
		)
}

export default Text;