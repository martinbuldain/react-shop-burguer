import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burguer from '../../components/Burguer/Burguer';
import BuildControls from '../../components/Burguer/BuildControls/BuildControls';

class BurguerBuilder extends Component {

    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 2,
            meat: 2
        }
    }

    render() {
        return (
            <Aux>
                <Burguer ingredients={this.state.ingredients} />
                <BuildControls />
            </Aux>
        );
    }
}

export default BurguerBuilder;