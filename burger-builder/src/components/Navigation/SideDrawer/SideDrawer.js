import React from 'react';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import classes from "./SideDrawer.css";
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
  let assignedClasses = null;
  if(props.show){
    assignedClasses = [classes.SideDrawer, classes.Open]
  } else {
    assignedClasses = [classes.SideDrawer, classes.Close]
  }
      
  return (
    <div>
      <Backdrop cancel={props.closed} show={props.show}/>
      <div className={assignedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
           <NavItems /> 
        </nav>
      </div>
     </div>
  );
}

export default sideDrawer;