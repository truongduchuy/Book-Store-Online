import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import BreadCrumb from '../BreadCrumb';

const Cart = ({ children, pages }) => {
  return (
    <>
      <Header />
      <main>
        <BreadCrumb pages={pages && pages} />
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Cart;
