import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Books from 'components/dashboard/Books';
import Authors from 'components/dashboard/Authors';
import Orders from 'components/dashboard/Orders';
import Genres from 'components/dashboard/Genres';
import Login from 'components/dashboard/Login';
import Home from 'components/storefront/Home';
import Shop from 'components/storefront/Shop';
import ProductDetails from 'components/storefront/ProductDetails';
import ScrollToTop from './components/storefront/ScrollToTop';

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/shop/:name" component={ProductDetails} />
        <Route exact path="/dashboard/login" component={Login} />
        <Route exact path="/dashboard/books" component={Books} />
        <Route exact path="/dashboard/authors" component={Authors} />
        <Route exact path="/dashboard/Genres" component={Genres} />
        <Route exact path="/dashboard/Orders" component={Orders} />
        {/* <Redirect to="/" /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
