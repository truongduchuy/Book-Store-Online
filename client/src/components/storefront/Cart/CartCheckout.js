import React, { useState } from 'react';
import styled from 'styled-components';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';

const StyledCard = styled.div`
  display: flex;
  justify-content: flex-end;

  > div {
    width: 250px;
    box-shadow: 1px 3px 5px 4px rgba(0, 0, 0, 0.3);
    padding: 20px;

    > h3 {
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      margin-bottom: 20px;
    }

    > div {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    a {
      float: right;
    }
  }
`;

const Cart = () => {
  const [isLogined, setlogined] = useState(false);
  console.log(process.env.REACT_APP_PAYPAL_ID);
  return (
    <StyledCard>
      <div>
        <h3>Cart Totals</h3>
        <div>
          <p>Total:</p>
          <p>$35</p>
        </div>
        {!isLogined ? (
          <PayPalButton
            disableCard
            shippingPreference="NO_SHIPPING"
            amount={25}
            style={{
              layout: 'horizontal',
              label: 'pay',
            }}
            clientId={process.env.REACT_APP_PAYPAL_ID}
            disableFunding
            onSuccess={(details, data) => {
              console.log('details ', details);
              console.log('data ', data);
            }}
          />
        ) : (
          <Link to="/login">Login to Checkout</Link>
        )}
      </div>
    </StyledCard>
  );
};
export default Cart;
