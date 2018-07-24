import React from 'react';

const layout = (props) => {
	return(
			<div>
				<div>
					Navbar, SideDrawer
				</div>
				<div>
					{props.children}
				</div>
			</div>
		)
}

export default layout