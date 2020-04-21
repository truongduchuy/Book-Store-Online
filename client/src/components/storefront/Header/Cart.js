import React from 'react';
import styled from 'styled-components';
import cart from './shopping.gif';

const Cart = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 20px;
  }
`;

export default ({ quantity }) => (
  <Cart>
    <img src={cart} alt="cart" />
    <span>({quantity})</span>
  </Cart>
);
