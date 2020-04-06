import React from 'react';
import styled from 'styled-components';
import { Rate } from 'antd';
import 'antd/es/rate/style/css';

const StyledBook = styled.div`
  box-sizing: border-box;
  display: flex;
  margin: 20px 0 20px 20px;
  align-items: center;
  flex-wrap: wrap;

  .product {
    margin: 0 10px;
    width: calc(25% - 30px);

    .product-wrapper {
      .product-head {
        .product-image {
          img {
            box-shadow: 0 0px 18px rgba(0, 0, 0, 0.2);
            // max-width: 100%;
            height: auto;
          }
        }
      }

      .product-content {
        margin-top: 20px;

        .product-review {
          display: flex;
          align-items: center;

          ul:first-child {
            margin-right: 20px;
          }
        }

        .add-to-cart-btn {
          margin-top: 10px;

          button {
            border-radius: 20px;
            padding: 15px 20px;
            outline: none;
            cursor: pointer;
            border: navajowhite;
            box-shadow: 0 8px 18px 0px rgba(27, 139, 204, 0.36);
            background-color: #1b8bcc;
            color: white;

            &:hover {
              background-color: white;
              border: 1px solid #1b8bcc;
              color: #1b8bcc;
            }
          }
        }
      }
    }
  }
`;

const Books = () => {
  const RenderBook = () => (
    <div className="product">
      <div className="product-wrapper">
        <div className="product-head">
          <div className="product-image">
            <img
              src="https://cdn.shopify.com/s/files/1/1836/0759/products/23_270x.jpg?v=1494839081"
              alt=""
            />
          </div>
        </div>
        <div className="product-content">
          <div>
            <h2 className="product-name">Kinair Product Sample</h2>
          </div>
          <div className="product-price">
            <h2>$320.00</h2>
          </div>
          <div className="product-review">
            <Rate allowHalf defaultValue={2.5} />
            <span>2 reviews</span>
          </div>
          <div className="add-to-cart-btn">
            <button type="button">ADD TO CART</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <StyledBook>
      {[1, 2, 3, 4].map((item, index) => (
        <RenderBook key={index} />
      ))}
    </StyledBook>
  );
};

export default Books;
