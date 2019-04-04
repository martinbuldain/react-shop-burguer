import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

/**
 * I englobe everything with a div that wraps my entire page because I will use router in here
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

    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients} />
            </div>
        )
    }

}

export default Checkout;