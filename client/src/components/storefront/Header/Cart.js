import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import cart from './shopping.gif';

const StyledCart = styled(NavLink)`
  display: flex;
  align-items: center;
  cursor: pointer;
  transform: translateY(-3px);

  img {
    width: 25px;
  }

  span {
    font-size: 14px;
    transform: translate(4px, -4px);
    font-weight: 500;
  }
`;

const Cart = ({ numOfBooks }) => (
  <StyledCart to="/cart">
    <img src={cart} alt="cart" />
    <span>{numOfBooks}</span>
  </StyledCart>
);

export default connect(state => ({
  numOfBooks: state.cart.cart.reduce((acc, item) => acc + Number(item.quantity), 0),
}))(Cart);
