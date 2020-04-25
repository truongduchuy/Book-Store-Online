import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  display: flex;
  justify-content: flex-end;

  > div {
    width: 200px;
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
`;

const Cart = () => (
  <StyledCard>
    <div>
      <h3>Cart Totals</h3>
      <div>
        <p>Total:</p>
        <p>$35</p>
      </div>
    </div>
  </StyledCard>
);

export default Cart;
