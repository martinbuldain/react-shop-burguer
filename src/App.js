import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurguerBuilder from './containers/BurguerBuilder/BurguerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';


/**
 * Switch will match the first route and will stop analizing, but for using this I nee
 * to change the order.
 * If I put exact in path="/" the order does not matter, because "/" is not treated like a prefix
 * So to sum up, with exact the order does not matter, witout it, it matters
 * 
 */
class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/" component={BurguerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
