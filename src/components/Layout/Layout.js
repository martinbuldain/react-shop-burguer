import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

/**
 * As I will reuse logic and keep an state for showing the backdrop in the Toolbar and in the SideDrawer
 * I ended up turning this component into a Class based component.
 */

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDRawerCloseHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDRawerCloseHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;