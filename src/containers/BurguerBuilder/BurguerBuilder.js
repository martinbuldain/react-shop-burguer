import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burguer from '../../components/Burguer/Burguer';

class BurguerBuilder extends Component {
    render() {
        return (
            <Aux>
                <Burguer />
                <div>Build Controls</div>
            </Aux>
        );
    }
}

export default BurguerBuilder;