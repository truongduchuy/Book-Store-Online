import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import cart from './shopping.gif';

const Cart = styled(Link)`
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

export default ({ quantity }) => (
  <Cart to="/shop/cart">
    <img src={cart} alt="cart" />
    <span>{quantity}</span>
  </Cart>
);
