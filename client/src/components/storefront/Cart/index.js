import React from 'react';
import { Icon, Spin } from 'antd';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Layout from '../Layout';
import CardCheckout from './CartCheckout';
import { REMOVE_ITEM, UPDATE_CART } from './ducks';

const StyledContent = styled.div`
  padding: 100px 70px;
  font-weight: 500;

  table {
    width: 100%;
    margin-bottom: 50px;

    thead tr th,
    tbody tr td {
      padding: 9px 12px;
    }

    thead tr {
      border-bottom: 3px solid #006eff;
    }

    tbody .product {
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      // &:not(:last-child) {
      // }

      &__remove {
        width: 10%;

        > div {
          cursor: pointer;
          color: red;
        }
      }

      &__image {
        padding: 9px 0;
        width: 20%;

        img {
          width: 80px;
        }
      }

      &__title {
        width: 25%;
      }

      &__quantity {
        input {
          width: 80px;
          border: 1px solid rgba(0, 0, 0, 0.2);
          text-align: center;
          padding: 5px;
        }
      }

      &__price,
      &__quantity,
      &__subtotal {
        width: 15%;
      }
    }
  }

  @media screen and (max-width: 750px) {
    padding: 100px 30px;
  }

  @media screen and (max-width: 600px) {
    padding: 100px 30px;

    table {
      thead {
        display: none;
      }

      tbody .product {
        border-bottom: none !important;
        display: block;

        > td {
          width: 100%;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        &__image {
          display: none;
        }

        &__remove,
        &__title,
        &__price,
        &__quantity,
        &__subtotal {
          display: flex;
          justify-content: space-between;
        }

        &__remove {
          justify-content: center;
        }

        &__title::before {
          content: 'Title';
        }

        &__price::before {
          content: 'Price';
        }

        &__quantity::before {
          content: 'Quantity';
        }

        &__subtotal::before {
          content: 'Subtotal';
        }
      }
    }
  }
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
`;

const Cart = ({ cart, dispatch, total, isWaitingCheckout }) => {
  return (
    <Layout pages={['Home', 'cart']}>
      <StyledContent>
        {isWaitingCheckout && (
          <div style={{ textAlign: 'center', height: '40vh' }}>
            <Loading>
              <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />
            </Loading>
          </div>
        )}
        {cart.length > 0 && !isWaitingCheckout && (
          <>
            <table>
              <thead>
                <tr>
                  <th>&nbsp;</th>
                  <th>&nbsp;</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cart?.map(({ book, quantity, _id }, index) => (
                  <tr key={_id} className="product">
                    <td className="product__remove">
                      <div onClick={() => dispatch({ type: REMOVE_ITEM, payload: _id })}>
                        <Icon type="delete" />
                      </div>
                    </td>
                    <td className="product__image">
                      <Link to={`/shop/${book.title}`}>
                        <img src={book.imageUrl} alt="book" />
                      </Link>
                    </td>
                    <td className="product__title">{book.title}</td>
                    <td className="product__price">${book.price}</td>
                    <td className="product__quantity">
                      <input
                        type="number"
                        value={quantity}
                        onChange={e =>
                          dispatch({
                            type: UPDATE_CART,
                            payload: {
                              quantity: e.target.value,
                              _id,
                            },
                          })
                        }
                      />
                    </td>
                    <td className="product__subtotal">${book.price * quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <CardCheckout total={total} />
          </>
        )}
        {cart.length === 0 && (
          <div style={{ textAlign: 'center', height: '40vh' }}>Your cart is currently empty.</div>
        )}
      </StyledContent>
    </Layout>
  );
};

export default connect(state => ({
  cart: state.cart.cart,
  total: state.cart.cart.reduce((acc, { book, quantity }) => acc + book.price * quantity, 0),
  isWaitingCheckout: state.cart.isWaitingCheckout,
}))(Cart);
