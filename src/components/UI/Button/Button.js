import React from 'react';
import classes from './Button.module.css';

/**
 * I pass an array yo join it, because I always want to render the .Button class
 * but conditionally render the .Success or .Danger classes, where btnType must be
 * Success or Danger
 */
const button = (props) => (
    <button
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked}>{props.children}</button>
);

export default button;