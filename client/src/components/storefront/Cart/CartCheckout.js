import React from 'react';
import styled from 'styled-components';
import Button from '../Button';

const StyledCard = styled.div`
  display: flex;
  justify-content: flex-end;

  > div {
    width: 250px;
    box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.5);
    padding: 20px;

    > h3 {
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      margin-bottom: 20px;
    }

    > div {
      display: flex;
      justify-content: space-between;
    }
  }

  .checkout-btn {
    margin-top: 20px;

    > button {
      max-width: 100%;
      width: 100%;
    }
  }
`;

const Cart = () => (
  <StyledCard>
    <div>
      <h3>Cart Totals</h3>
      <div>
        <p>Total:</p>
        <p>$35</p>
      </div>
      <div className="checkout-btn">
        <Button>Checkout</Button>
      </div>
    </div>
  </StyledCard>
);

export default Cart;
