import React from 'react';
import classes from './NavItem.css'
import { Link } from 'react-router-dom'
const navItem = (props) => {
  return(
    <li className={classes.NavItem}>
      <Link to={props.link} className={props.active ? classes.active : null}> 
      {props.children}</Link>
    </li>
  )
}

export default navItem;