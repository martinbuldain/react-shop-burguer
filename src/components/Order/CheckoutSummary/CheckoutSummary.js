import React from 'react';
import Burguer from '../../Burguer/Burguer';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    return(
        <div className={classes.CheckoutSummary}>
            <h1>Hope it taste well!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burguer ingredients={props.ingredients}/>
            </div>
            <Button
                btnType="Danger"
                clicked>CANCEL</Button>
            <Button
                btnType="Success"
                clicked>CONTINUE</Button>
        </div>
    );
};

export default checkoutSummary;