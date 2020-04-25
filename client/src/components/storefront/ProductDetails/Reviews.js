import React from 'react';
import styled from 'styled-components';
import Button from '../Button';
import { Rate } from 'antd';
import 'antd/es/rate/style/css';

const Container = styled.div`
  width: 50%;
  padding-left: 70px;

  .content {
    padding-right: 20px;

    .top-box {
      align-items: center;
      display: flex;
      justify-content: space-between;
    }

    .rating-box {
      padding-bottom: 20px;
      border-bottom: 1px solid #eee;
      margin-bottom: 20px;
      display: flex;
      flex-direction: column;
      font-weight: 500;

      > span {
        margin-right: 40px;
      }

      > div {
        font-size: 50px;
        color: red;
      }
    }

    .reviews {
      .review {
        &__header {
          margin-bottom: 10px;

          > ul {
            margin-bottom: 10px;
            font-size: 16px;
          }
        }
      }
    }
  }

  @media screen and (max-width: 1024px) {
    width: 70%;
  }

  @media screen and (max-width: 750px) {
    width: 100%;
    padding-left: 30px;
  }
`;

const Reviews = () => (
  <Container>
    <div className="content">
      <div className="top-box">
        <h2>Reviews</h2>
        <Button lowercase padding="10px 25px" label="Write a review" />
      </div>
      <div className="rating-box">
        <div>4.5/5</div>
        <Rate allowHalf defaultValue={4.5} disabled />
        <span>Average customer rating</span>
      </div>
      <div className="reviews">
        <div className="review">
          <div className="review__header">
            <Rate allowHalf defaultValue={4.5} disabled />
            <h3>Excellent!</h3>
            <span>
              <strong>Henry hulk </strong>
              on
              <strong> Dec 01, 2019</strong>
            </span>
          </div>
          <div className="review__body">
            <p>
              The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those
              interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by
              Cicero are also reproduced in their exact original form, accompanied by English
              versions from the 1914 translation by H. Rackham.
            </p>
          </div>
        </div>
      </div>
    </div>
  </Container>
);

export default Reviews;
