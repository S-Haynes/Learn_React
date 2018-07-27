import React from 'react';
import './Post.css'

const post = (props) => {
  return (
    <div onClick={props.delete.bind(this, props.id)} className="Post">
      <h3>{props.title}</h3>
      <p>{props.body}</p>
    </div>
    
  )
}

export default post;