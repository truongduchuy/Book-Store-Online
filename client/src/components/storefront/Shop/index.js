import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import BreadImg from './bread.jpg';
import jqueryImg from './jqueryBook.webp';

const StyledImage = styled.div`
  position: relative;

  > div:nth-child(2) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    h1 {
      font-size: 35px;
    }

    .bread-crumb {
      text-align: center;
      span {
        margin: 0 10px;
      }
    }
  }
`;

const StyledContent = styled.div`
  display: flex;
  margin: 100px 0;
  padding: 0 70px;

  .filter-box {
    flex-basis: 25%;
    padding: 0 20px;
    margin-bottom: 50px;

    h2 {
      margin-bottom: 20px;
    }

    > div:first-child {
      padding-bottom: 35px;
      margin-bottom: 35px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);

      input {
        border: 1px solid rgba(0, 0, 0, 0.2);
        padding: 5px;
        width: 100%;
      }
    }

    > div:nth-child(2) {
      ul {
        list-style: none;
        padding-left: 10px;

        li {
          margin-bottom: 15px;
          cursor: pointer;
          font-weight: 500;

          &:hover {
            color: #1890ff;
          }
        }
      }
    }
  }

  .books-box {
    flex-basis: 75%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .wrapper {
      padding: 0 20px;
      flex-basis: 25%;
      margin-bottom: 50px;

      .item {
        border: 1px solid #eee;

        &__image-box {
          > a {
            display: flex;
            justify-content: center;

            > img {
              height: 300px;
            }
          }
        }

        &__content {
          border-top: 1px solid #eee;
          font-weight: 700;
          font-size: 16px;
          padding: 10px;
        }
      }
    }
  }

  @media screen and (max-width: 1025px) {
    flex-direction: column;
  }

  @media screen and (max-width: 768px) {
    .books-box {
      img {
        height: 250px !important;
      }
    }
  }

  @media screen and (max-width: 480px) {
    .books-box {
      justify-content: center;

      img {
        height: 320px !important;
      }
    }
  }
`;

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <StyledImage>
          <img src={BreadImg} alt="bread" />
          <div className="heading">
            <h1>Shop</h1>
            <div className="bread-crumb">
              <Link to="/">Home</Link>
              <span>/</span>
              Shop
            </div>
          </div>
        </StyledImage>
        <StyledContent>
          <div className="filter-box">
            <div>
              <h2>Search</h2>
              <input type="text" placeholder="Search books" />
            </div>
            <div>
              <h2>Categories</h2>
              <ul>
                <li>Biography</li>
                <li>Adventure</li>
                <li>Children</li>
                <li>Cook</li>
              </ul>
            </div>
          </div>
          <div className="books-box">
            {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
              <div className="wrapper" key={index}>
                <div className="item">
                  <div className="item__image-box">
                    <a href="###">
                      <img src={jqueryImg} alt="img" />
                    </a>
                    <div className="actions"></div>
                  </div>
                  <div className="item__content">
                    <a href="###">Book really cool</a>
                    <p>35$</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </StyledContent>
      </main>
      <Footer />
    </>
  );
};

export default Home;
