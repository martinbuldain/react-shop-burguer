import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route } from "react-router-dom";

/**
 * I englobe everything with a div that wraps my entire page because I will use router in here
 * As this component was loaded with Route, I have access to history object.
 * I changed Route of ContactData from component to render because I need to pass data via props
 * I ended up changin componentDidMount to componentWillMount in order to not have error null by the
 * ingredients state null passed to ContactData, because componentWillMount fire before render the childs
 * componentDidMount fire after childs were rendered
 * I also pass the history props to ContactData because in the aproach of using render in Route I do not
 * have access in ContactData to history prop. The other way could be wrapp ContactData with witRoute
 */
class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  };

  componentWillMount() {
    // Here I will parse the queryParams of the hamburguer ingredients
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (const param of query.entries()) {
      // param[0] In 0 is the key
      // param[1] In 1 is the value
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({
      ingredients: ingredients,
      totalPrice: price
    });
  }

  checkoutCancelledHandler = () => {
    // It goes to the last page
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={() => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              {...this.props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
