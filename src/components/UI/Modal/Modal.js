import React from 'react';
import classes from './Modal.module.css';

/**
 * I receive show property in order to be able to change some css properties and
 * animate the modal, depending on the Order Buton was clicked.
 * Because only if state.purchasing is true the modal should be visible
 */
const modal = (props) => (
    <div
        className={classes.Modal}
        style={{
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.show ? '1' : '0'
        }}>
        {props.children}
    </div>
);

export default modal;