import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { PayPalButton } from 'react-paypal-button-v2';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ORDER_REQUEST } from './ducks';
import ShippingInfoModal from './ShippingInfo';

const StyledCard = styled.div`
  display: flex;
  justify-content: flex-end;

  > div {
    width: 350px;
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

    .shipping-info {
      display: block;
    }

    a {
      float: right;
    }
  }
`;

const Cart = ({ total, isLogined, cart, dispatch, history, currentCustomer }) => {
  const [shippingModalOpen, setshippingModalOpen] = useState(false);

  const { address, phoneNumber } = currentCustomer;

  return (
    <StyledCard>
      <div>
        <h3>Cart Totals</h3>
        <div>
          <p>Total:</p>
          <p>
            <strong>${total}</strong>
          </p>
        </div>
        {isLogined && (
          <div className="shipping-info">
            <div>
              Your order will be shipped to <strong>{address}</strong>
            </div>
            <div>
              Phone number: <strong>{phoneNumber}</strong>
            </div>
            <div>
              Please{' '}
              <span
                style={{ cursor: 'pointer', color: '#1890ff' }}
                onClick={() => setshippingModalOpen(true)}
              >
                update
              </span>{' '}
              if you want to ship to another address!
            </div>
          </div>
        )}
        <ShippingInfoModal isOpen={shippingModalOpen} onClose={() => setshippingModalOpen(false)} />
        {isLogined ? (
          <PayPalButton
            shippingPreference="NO_SHIPPING"
            amount={total}
            style={{
              layout: 'horizontal',
              label: 'pay',
            }}
            clientId={process.env.REACT_APP_PAYPAL_ID}
            options={{ disableFunding: 'credit', locale: 'en-VN' }}
            onSuccess={details => {
              if (details.status === 'COMPLETED') {
                console.log('hello');
                dispatch({
                  type: ORDER_REQUEST,
                  payload: {
                    history,
                    cart: cart.map(item => ({ bookId: item._id, quantity: Number(item.quantity) })),
                    currentCustomer,
                  },
                });
              }
            }}
          />
        ) : (
          <Link to="/login">Login to Checkout</Link>
        )}
      </div>
    </StyledCard>
  );
};
export default connect(state => ({
  ...state,
  isLogined: state.customer.token,
  currentCustomer: state.customer.currentCustomer,
  cart: state.cart.cart,
}))(withRouter(Cart));
