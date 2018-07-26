import React from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import classes from './Layout.css'

const layout = (props) => {
	return(
			<div>
				<Toolbar />
				<main className={classes.Content}>
					{props.children}
				</main>
			</div>
		)
}

export default layout