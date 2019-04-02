import React, { Component } from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

/**
 * I receive show property in order to be able to change some css properties and
 * animate the modal, depending on the Order Buton was clicked.
 * Because only if state.purchasing is true the modal should be visible
 * I show the backdrop here because it is actively related to the modal in this case
 */
class Modal extends Component {

    /** I want to ensure that Modal updates only if show property, that dependes on the
     * the state, changes 
     * I also need to see if prop.children, that is for the Spinner, because if is loading when Checkout
     * it show Spinner else it must show the Order Summary, because the children of Modal changes.
     * So that it does update if it has new children
     */
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Modal;