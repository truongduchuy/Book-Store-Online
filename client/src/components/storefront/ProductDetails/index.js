import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Spin, Icon } from 'antd';
import styled from 'styled-components';
import { Rate } from 'antd';
import 'antd/es/rate/style/css';
import Reviews from './Reviews';
import Button from '../Button';
import Layout from '../Layout';
import { BOOK_DETAILS_REQUEST } from 'components/dashboard/Books/ducks';
import { GET_BOUGHT_LIST_REQUEST } from 'components/storefront/Customer/ducks';
import { ADD_TO_CART } from 'components/storefront/Cart/ducks';
import Notification from 'antd-components/notification';

const StyledContent = styled.div`
  .details {
    display: flex;
    flex-wrap: wrap;
    padding: 100px 70px;
    margin: 0 -20px;

    > div {
      padding: 0 20px;
    }

    &__image-box {
      flex-basis: 50%;

      > div {
        padding: 30px 50px;
        display: flex;
        justify-content: center;
        border: 1px solid rgba(0, 0, 0, 0.2);

        img {
          max-width: 100%;
        }
      }
    }

    &__image-content {
      flex-basis: 50%;
      margin-top: 20px;

      > .review {
        ul {
          margin-right: 15px;
        }
      }

      > p:nth-child(3) {
        border-bottom: 1px solid #eee;
        font-weight: 500;
        font-size: 20px;
        margin-bottom: 20px;
      }

      > p:nth-child(4) {
        margin-bottom: 20px;
      }

      .actions {
        margin-bottom: 20px;
        p {
          margin-bottom: 10px;
        }

        > span {
          padding: 5px 10px;
          border: 1px solid #eee;
          cursor: pointer;

          &:nth-child(3) {
            border-width: 1px 0;
            cursor: initial;
          }
        }
      }
    }

    @media screen and (max-width: 750px) {
      padding: 100px 30px;
      flex-direction: column;

      &__image-box {
        margin-bottom: 30px;
      }
    }
  }
`;

const calcAverageReview = reviews => {
  const average = reviews?.reduce((acc, review) => acc + review.rate, 0) / reviews?.length;
  //roundoff number to nearest 0.5
  return Math.round(average * 2) / 2;
};

const ProductDetails = ({
  match,
  dispatch,
  bookDetails,
  quantityInCart,
  isWaitingBoughtList,
  boughtList,
  isLogined,
}) => {
  const [num, setNum] = useState(1);
  const title = match.params.name;
  const { price, description, imageUrl, reviews, quantity, _id } = bookDetails;
  const average = calcAverageReview(reviews) || 0;

  useEffect(() => {
    if (isLogined) dispatch({ type: GET_BOUGHT_LIST_REQUEST });
    dispatch({ type: BOOK_DETAILS_REQUEST, payload: title });
  }, [dispatch, title, _id, isLogined]);

  const quantityValid = (numAdded, quantityOfBook) =>
    numAdded + Number(quantityInCart) <= quantityOfBook;

  const handleChangeQuantity = value => {
    if (!quantityValid(value, quantity)) {
      Notification.warning(`Sorry, we only have ${quantity}!`);
    } else if (value > 0) {
      setNum(value);
    }
  };

  if (!reviews)
    return (
      <div style={{ margin: '15px auto' }}>
        <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />
      </div>
    );

  return (
    <Layout pages={['Home', 'Shop', title]}>
      <StyledContent>
        <div className="details">
          <div className="details__image-box">
            <div>
              <img src={imageUrl} alt="img" />
            </div>
          </div>
          <div className="details__image-content">
            <h2>{title}</h2>
            <div className="review">
              <Rate allowHalf value={average} disabled />
              <span>
                {reviews?.length} {reviews?.length > 1 ? 'reviews' : 'review'}
              </span>
            </div>
            <p>${price}</p>
            <p>{description}</p>
            <div className="actions">
              <p>quantity:</p>
              <span onClick={() => handleChangeQuantity(num - 1)}>-</span>
              <span>{num}</span>
              <span onClick={() => handleChangeQuantity(num + 1)}>+</span>
            </div>
            {quantity > 0 && (
              <Button
                label="Add to cart"
                onClick={() => {
                  if (!quantityValid(num, quantity)) {
                    Notification.warning(`Sorry, we only have ${quantity}!`);
                  } else
                    dispatch({
                      type: ADD_TO_CART,
                      payload: { book: bookDetails, quantityAdded: num },
                    });
                }}
              />
            )}
          </div>
        </div>
        <Reviews average={average} bookId={_id} />
      </StyledContent>
    </Layout>
  );
};

export default connect(({ book, cart, customer }) => ({
  bookDetails: book.bookDetails,
  quantityInCart: cart.cart.find(item => book.bookDetails._id === item._id)?.quantity || 0,
  isWaitingBoughtList: customer.isWaitingBoughtList,
  boughtList: customer.boughtList,
  isLogined: customer.token,
}))(ProductDetails);
