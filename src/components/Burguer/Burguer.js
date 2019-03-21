import React from 'react';
import classes from './Burguer.module.css';
import BurguerIngredient from './BurguerIngredient/BurguerIngredient';

/** I return a div because I want to use the Burguer as a wrapper for all the ingredients
 * So I can give width and hight to this Burguer wrapper
 */
const burguer = (props) => {
    return (
        <div className={classes.Burguer}>
            <BurguerIngredient type="bread-top"/>
            <BurguerIngredient type="cheese"/>
            <BurguerIngredient type="meat"/>
            <BurguerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burguer;