import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';

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

    componentDidMount() {
        // Here I will parse the queryParams of the hamburguer ingredients
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (const param of query.entries()) {
            // param[0] In 0 is the key
            // param[1] In 1 is the value
            ingredients[param[0]] = +param[1];
        }
        this.setState({
            ingredients: ingredients
        });
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
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData} />
            </div>
        )
    }

}

export default Checkout;