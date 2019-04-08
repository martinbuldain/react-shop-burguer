import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import BuildControls from '../../components/Burguer/BuildControls/BuildControls';
import Burguer from '../../components/Burguer/Burguer';
import OrderSummary from '../../components/Burguer/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

/**
 * I ended up turning Modal into a class based component in order to be able to implement
 * shouldComponentUpdate() inside Modal.js because in fact, this component should only be render
 * if this.state.purchasing changes(and send to show variable in Modal.js).
 * I could set the purchaseable property in the Redux State, but I will leave the aproach of
 * mixing State UI & Redux State for this case, in the updateStatePurchaseable method
 */

class BurguerBuilder extends Component {
  state = {
    purchasing: false, // Para el order button modal
    loading: false,
    error: false
  };

  componentDidMount() {
    // axios.get('https://react-my-burger-e97c9.firebaseio.com/ingredients.json')
    //     .then(response => {
    //         this.setState({
    //             ingredients: response.data
    //         })
    //     })
    //     .catch(error => {
    //         this.setState({
    //             error: true
    //         })
    //     });
  }

  /** purchaseable is use to determine if enable or disable Order Button in BuildControls */
  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((newSum, el) => {
        return newSum + el;
      }, 0);
    return sum > 0;
  }

  /**
   * It will be trigger every time we click the Order Button
   */
  purchaseHandler = () => {
    this.setState({
      purchasing: true
    });
  };

  /**
   * When user clicks cancel in the Modal
   */
  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  };

  /**
   * Checkout
   */
  purchaseContinueHandler = () => {
    // Insert a new route into the stack of pages manually
    this.props.history.push('/checkout');
  };

  /**
   * disabledInfo holds a boolean for each ingredient if it is less than 0, then
   * I should disable button Less
   */
  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burguer = this.state.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burguer = (
        <Aux>
          <Burguer ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemove}
            disabled={disabledInfo}
            price={this.props.price}
            purchaseable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          price={this.props.price}
        />
      );
      if (this.state.loading) {
        orderSummary = <Spinner />;
      }
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burguer}
      </Aux>
    );
  }
}

const matStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ignName =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ignName }),
    onIngredientRemove: ignName =>
      dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ignName })
  };
};

export default connect(
  matStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurguerBuilder, axios));
