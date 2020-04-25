import React from 'react';
import { Icon } from 'antd';
import styled from 'styled-components';
import Layout from '../Layout';
import AlchemistImg from './alchemist.jpg';
import Button from '../Button';
import CardCheckout from './CartCheckout';

const StyledContent = styled.div`
  padding: 100px 70px;
  font-weight: 500;

  table {
    width: 100%;
    margin-bottom: 20px;

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
          content: 'Product';
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

  .checkout-btn {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
`;

const Cart = () => {
  return (
    <Layout pages={['Home', 'Shop', 'cart']}>
      <StyledContent>
        <table>
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2].map((item, index) => (
              <tr key={index} className="product">
                <td className="product__remove">
                  <div>
                    <Icon type="delete" />
                  </div>
                </td>
                <td className="product__image">
                  <a href="###">
                    <img src={AlchemistImg} alt="book" />
                  </a>
                </td>
                <td className="product__title">The Alchemist</td>
                <td className="product__price">$35</td>
                <td className="product__quantity">
                  <input type="number" />
                </td>
                <td className="product__subtotal">$35</td>
              </tr>
            ))}
          </tbody>
        </table>
        <CardCheckout />
        <div className="checkout-btn">
          <Button>Checkout</Button>
        </div>
      </StyledContent>
    </Layout>
  );
};

export default Cart;
