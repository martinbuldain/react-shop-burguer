import axios from 'axios';

/**
 * I will have 2 separate endpoint, one for orders and other for the login
 * that's why I create separate instances to use in different places in the application
 */
const instance = axios.create({
    baseURL: 'https://react-my-burger-e97c9.firebaseio.com/'
})

export default instance;