import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    axios.get('/orders.json')
      .then(res => {
        const fetchedOrders = [];
        for(let key in res.data) {
          // I am copying all data from Firebase
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        this.setState({
          orders: fetchedOrders,
          loading: false 
        });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        <Order />
        <Order />
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);