import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burguer from '../../components/Burguer/Burguer';
import BuildControls from '../../components/Burguer/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burguer/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

/**
 * I ended up turning Modal into a class based component in order to be able to implement
 * shouldComponentUpdate() inside Modal.js because in fact, this component should only be render
 * if this.state.purchasing changes(and send to show variable in Modal.js)
 */

class BurguerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false, // Para el order button modal
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://react-my-burger-e97c9.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({
                    ingredients: response.data
                })
            })
            .catch(error => {
                this.setState({
                    error: true
                })
            });
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
        this.setState({
            purchaseable: sum > 0
        });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredient = { ...this.state.ingredients };
        updatedIngredient[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            ingredients: updatedIngredient,
            totalPrice: newPrice
        });
        // Due to the way setState works(it takes time to update), it might not update
        // ingredients when I use ingredients in updatePurchaseState, that is why i have
        // to send the updatedIngredient to ensure it is the last value
        this.updatePurchaseState(updatedIngredient);
    }

    /**
     * If oldCount is negative or 0, do nothing
     * Also I want to disable 'Less' button if oldCount satifies this condition
     */
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredient = { ...this.state.ingredients };
        updatedIngredient[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            ingredients: updatedIngredient,
            totalPrice: newPrice
        });
        // Due to the way setState works(it takes time to update), it might not update
        // ingredients when I use ingredients in updatePurchaseState, that is why i have
        // to send the updatedIngredient to ensure it is the last value
        this.updatePurchaseState(updatedIngredient);
    }

    /**
     * It will be trigger every time we click the Order Button
     */
    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    }

    /**
     * When user clicks cancel in the Modal
     */
    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    /**
     * Checkout
     */
    purchaseContinueHandler = () => {
        // this.setState({
        //     loading: true
        // })
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Martin B',
        //         address: {
        //             street: 'Av. Calipso',
        //             zipCode: '18867',
        //             country: 'Argentina'
        //         },
        //         email: 'test@test.com',
        //         deliveryMethod: 'fastest'
        //     }
        // }
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({
        //             loading: false,
        //             purchasing: false //I also want to close the Modal
        //         })
        //     })
        //     .catch(error => {
        //         this.setState({
        //             loading: false,
        //             purchasing: false //I also want to close the Modal
        //         })
        //     });
        // Insert a new route into the stack of pages manually
        this.props.history.push('/checkout');
    }

    /**
     * disabledInfo holds a boolean for each ingredient if it is less than 0, then
     * I should disable button Less
     */
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burguer = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />
        if (this.state.ingredients) {
            burguer = (
                <Aux>
                    <Burguer ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchaseable={this.state.purchaseable}
                        ordered={this.purchaseHandler} />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                price={this.state.totalPrice} />
            if (this.state.loading) {
                orderSummary = <Spinner />
            }
        }
        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burguer}
            </Aux>
        );
    }
}

export default withErrorHandler(BurguerBuilder, axios);