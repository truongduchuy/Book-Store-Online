import React, { useEffect } from 'react';
import store from 'store';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Books from 'components/dashboard/Books';
import Orders from 'components/dashboard/Orders';
import Genres from 'components/dashboard/Genres';
import Employees from 'components/dashboard/Employees';
import Statistics from 'components/dashboard/Statistics';
import DashBoardLogin from 'components/dashboard/Login';
import Home from 'components/storefront/Home';
import Shop from 'components/storefront/Shop';
import Login from 'components/storefront/Login';
import Register from 'components/storefront/Register';
import ProductDetails from 'components/storefront/ProductDetails';
import ScrollToTop from './components/storefront/ScrollToTop';
import Cart from './components/storefront/Cart';
import Checkout from './components/storefront/Checkout';
import Customer from './components/storefront/Customer';
import { GET_CART } from './components/storefront/Cart/ducks';
import { GET_DATA_FROM_LOCAL } from 'components/storefront/Customer/ducks';
import { UPDATE_EMPLOYEE } from 'components/dashboard/Employees/ducks';

const App = ({ dispatch }) => {
  useEffect(() => {
    const cart = localStorage.getItem('cart');
    store.dispatch({ type: GET_CART, payload: JSON.parse(cart) || [] });

    const customerData = localStorage.getItem('customerData');
    store.dispatch({ type: GET_DATA_FROM_LOCAL, payload: JSON.parse(customerData) });

    const employeeData = localStorage.getItem('bookstore-employee');
    store.dispatch({ type: UPDATE_EMPLOYEE, payload: JSON.parse(employeeData) });
  }, [dispatch]);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout/success" component={Checkout} />
        <Route exact path="/shop/:name" component={ProductDetails} />
        <Route exact path="/customer" component={Customer} />
        <Route exact path="/dashboard/login" component={DashBoardLogin} />
        <Route exact path="/dashboard/books" component={Books} />
        <Route exact path="/dashboard/Genres" component={Genres} />
        <Route exact path="/dashboard/Employees" component={Employees} />
        <Route exact path="/dashboard/Orders" component={Orders} />
        <Route exact path="/dashboard/Statistics" component={Statistics} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
