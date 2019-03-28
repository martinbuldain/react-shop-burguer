import React from 'react';

// Due to webpack will take all our src/ files, bundle them togetherand create a new output folder
// Thats why we have to import the image in a different way, to make webpack aware that we have an image
// and it will handle the image different with a special plugin, so basically it will copy the image
// to the dist folder then and optimaze it.
// burguerLogo will receive the path of the image where webpack will copy it to

import burguerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={burguerLogo} alt="My Burguer" />
    </div>
);

export default logo;