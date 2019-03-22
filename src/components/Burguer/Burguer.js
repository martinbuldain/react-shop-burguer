import React from 'react';
import classes from './Burguer.module.css';
import BurguerIngredient from './BurguerIngredient/BurguerIngredient';

/** I return a div because I want to use the Burguer as a wrapper for all the ingredients
 * So I can give width and hight to this Burguer wrapper.
 * props.ingredients is a javascript object, so I have to transform to an array to loop throw
 * The idea with transformedIngredients is to have an array of arrays, where each item of the array
 * is an ingredient.
 * For example cheese will be a subarray of 2:
 *  [<BurguerIngredient key=cheese0 type=cheese />
 *  <BurguerIngredient key=cheese1 type=cheese />]
 */
const burguer = (props) => {
    const transformedIngredients = Object.keys(props.ingredients).map(ingredientKey => {
        return [...Array(props.ingredients[ingredientKey])].map((_, index) => {
            return <BurguerIngredient key={ingredientKey + index} type={ingredientKey} />
        })
    });

    console.log(transformedIngredients);
    return (
        <div className={classes.Burguer}>
            <BurguerIngredient type="bread-top" />
            {transformedIngredients}
            <BurguerIngredient type="bread-bottom" />
        </div>
    );
}

export default burguer;