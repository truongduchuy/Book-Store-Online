import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Input } from 'antd';
import { connect } from 'react-redux';
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

    form {
      margin-top: 20px;

      p {
        margin-bottom: 10px;
      }

      input,
      textarea {
        margin-bottom: 20px;
      }
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
        margin-bottom: 20px;

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

const { TextArea } = Input;

const Reviews = ({ average, reviews }) => {
  const [isWritingReview, setisWritingReview] = useState(false);
  const [reviewData, setReviewData] = useState({ heading: '', body: '', rate: 0 });
  const { heading, body, rate } = reviewData;
  const roundedRate =
    Math.round((reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length) * 10) /
    10;
  console.log(reviews);

  const handleChange = (value, field) => {
    setReviewData({ ...reviewData, [field]: value });
  };

  const onSubmit = e => {
    e.preventDefault();

    console.log(reviewData);
    setisWritingReview(false);
  };

  return (
    <Container>
      <div className="content">
        <div className="top-box">
          <h2>Reviews</h2>
          <Button
            lowercase
            padding="10px 25px"
            label="Write a review"
            onClick={() => setisWritingReview(!isWritingReview)}
          />
        </div>
        {isWritingReview && (
          <form onSubmit={onSubmit}>
            <p>Heading</p>
            <Input
              type="text"
              value={heading}
              onChange={e => handleChange(e.target.value, 'heading')}
            />
            <p>comment</p>
            <TextArea rows={4} value={body} onChange={e => handleChange(e.target.value, 'body')} />
            <div style={{ marginBottom: '20px' }}>
              <p>Rate</p>
              <Rate allowHalf value={rate} onChange={value => handleChange(value, 'rate')} />
            </div>
            <Button lowercase padding="10px 25px">
              submit
            </Button>
          </form>
        )}
        {reviews.length === 0 ? (
          <div>No reviews yet.</div>
        ) : (
          <div className="rating-box">
            <div>{roundedRate}/5</div>
            <Rate allowHalf value={average} disabled />
            <span>Average customer rating</span>
          </div>
        )}
        <div className="reviews">
          {reviews.map(review => (
            <div className="review" key={review._id}>
              <div className="review__header">
                <Rate allowHalf defaultValue={review.rating} disabled />
                <h3>{review.heading}</h3>
                <span>
                  <strong>{review.reviewer.username}</strong>
                  <span> - </span>
                  <strong>{moment(review.createdAt).fromNow(true)} ago</strong>
                </span>
              </div>
              <div className="review__body">
                <p>{review.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default connect(state => ({ reviews: state.book.bookDetails.reviews }))(Reviews);
