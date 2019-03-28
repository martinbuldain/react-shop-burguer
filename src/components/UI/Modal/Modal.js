import React from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

/**
 * I receive show property in order to be able to change some css properties and
 * animate the modal, depending on the Order Buton was clicked.
 * Because only if state.purchasing is true the modal should be visible
 * I show the backdrop here because it is actively related to the modal in this case
 */
const modal = (props) => (
    <Aux>
        <Backdrop show={props.show} clicked={props.modalClosed} />
        <div
            className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
    </Aux>
);

export default modal;