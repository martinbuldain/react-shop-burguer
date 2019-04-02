import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

/**
 * I use this name with no capital letter because I want to indicate that it will be use
 * to wrap the class/functional based component in the 'export default'.
 * Because I will no use it in JSX. Just a convention
 */
 const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        state = {
            error: null // I will set the error coming from Firebase
        }

        componentWillMount () {
            axios.interceptors.request.use(req => {
                // To clear any previous errors
                this.setState({error: null});
                return req;
            });
            axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        /** Even clear the errors if backdrop is clicked */
        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render () {
            // With {...props} I distribute all props of the WrappedComponent in order to not lose them
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;