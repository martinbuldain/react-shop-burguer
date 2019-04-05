import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

/**
 * I englobe everything with a div that wraps my entire page because I will use router in here
 * As this component was loaded with Route, I have access to history object
 */
class Checkout extends Component {

    state = {
        ingredients: {
            salad: 1,
            cheese: 1,
            meat: 1,
            bacon: 1
        }
    }

    checkoutCancelledHandler = () => {
        // It goes to the last page
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
            </div>
        )
    }

}

export default Checkout;