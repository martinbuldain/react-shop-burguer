import React from "react";
import classes from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";

/**
 * I've change a href for NavLink to, and remove className because the NavLink will automatically
 * handle the active class defined in the css.
 * I also have to add exact because NavLink treats each route from '/', so BurguerBuilder is always
 * '/' path, so I pass exact from outside in order to not be in all NavLinks, just in the '/' case
 */
const navigationItem = props => (
  <li className={classes.NavigationItem}>
    <NavLink to={props.link} activeClassName={classes.active} exact={props.exact}>
      {props.children}
    </NavLink>
  </li>
);

export default navigationItem;
