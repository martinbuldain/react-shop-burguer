import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

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
  checkoutCancelledHandler = () => {
    // It goes to the last page
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('checkout/contact-data');
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ings}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={this.props.match.path + '/contact-data'}
          component={ContactData}
        />
      </div>
    );
  }
}

const matStateToProps = state => {
  return {
    ings: state.ingredients
  };
};

export default connect(matStateToProps)(Checkout);
