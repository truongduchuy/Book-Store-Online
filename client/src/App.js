import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Books from 'components/dashboard/Books';
import Authors from 'components/dashboard/Authors';
import Orders from 'components/dashboard/Orders';
import Genres from 'components/dashboard/Genres';
import DashBoardLogin from 'components/dashboard/Login';
import Home from 'components/storefront/Home';
import Shop from 'components/storefront/Shop';
import Login from 'components/storefront/Login';
import Register from 'components/storefront/Register';
import ProductDetails from 'components/storefront/ProductDetails';
import ScrollToTop from './components/storefront/ScrollToTop';
import Cart from './components/storefront/Cart';

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/shop/cart" component={Cart} />
        <Route exact path="/shop/:name" component={ProductDetails} />
        <Route exact path="/dashboard/login" component={DashBoardLogin} />
        <Route exact path="/dashboard/books" component={Books} />
        <Route exact path="/dashboard/authors" component={Authors} />
        <Route exact path="/dashboard/Genres" component={Genres} />
        <Route exact path="/dashboard/Orders" component={Orders} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
