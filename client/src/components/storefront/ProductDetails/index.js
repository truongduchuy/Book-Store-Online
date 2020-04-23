import React from 'react';
import styled from 'styled-components';
import { Rate } from 'antd';
import 'antd/es/rate/style/css';
import Header from '../Header';
import Footer from '../Footer';
import BreadCrumb from '../BreadCrumb';
import jqueryBook from './alchemist.jpg';
import Reviews from './Reviews';
import Button from '../Button';

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

      > h3 {
        font-size: 24px;
        font-weight: 400;
      }

      > .review {
        ul {
          margin-right: 15px;

          li {
            font-size: 16px;
          }
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

const ProductDetails = ({ match }) => {
  console.log(match.params.name);
  return (
    <>
      <Header />
      <main>
        <BreadCrumb pages={['Home', 'Shop', match.params.name]} />
        <StyledContent>
          <div className="details">
            <div className="details__image-box">
              <div>
                <img src={jqueryBook} alt="img" />
              </div>
            </div>
            <div className="details__image-content">
              <h3>{match.params.name}</h3>
              <div className="review">
                <Rate allowHalf defaultValue={4.5} disabled />
                <span>1 review</span>
              </div>
              <p>35$</p>
              <p>
                Every few decades a book is published that changes the lives of its readers forever.
                This is such a book - a magical fable about learning to listen to your heart, read
                the omens strewn along life’s path and, above, all follow your dreams.
              </p>
              <div className="actions">
                <p>quantity:</p>
                <span>-</span>
                <span>1</span>
                <span>+</span>
              </div>
              <Button label="Add to cart" />
            </div>
          </div>
          <Reviews />
        </StyledContent>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetails;
