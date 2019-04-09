import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

/**
 * ACTION CREATORS
 */

export const addIngredient = name => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  };
};

export const removeIngredient = name => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  };
};

// This is the synchronous action creator that I will dispatch when the async code in
// initIngredients is done
export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  };
};

export const fetchIngredientsFail = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAIL
  };
};

// I use it to load ingredients from Firebase.
// I have the dispatch method thanks to redux-thunk
export const initIngredients = () => {
  return dispatch => {
    axios
      .get('https://react-my-burger-e97c9.firebaseio.com/ingredients.json')
      .then(response => {
        dispatch(setIngredients(response.data));
      })
      .catch(error => {
        dispatch(fetchIngredientsFail());
      });
  };
};
