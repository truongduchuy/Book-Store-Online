import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Cart from './Cart';

const StyledHeader = styled.header`
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 10;
  
  a {
    color: black;
  }

  .header {
    display: flex;
    justify-content: space-between;
    padding: 0 70px;
    align-items: center;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.4);

    &__logo {
      a {
        font-size: 22px;
        color: #7b6262;
        font-weight: lighter;
      }

      > .cart,
      .burger {
        display: none;
      }
    }

    &__nav {
      list-style-type: none;
      display: flex;

      li {
        align-self: center;

        a {
          padding: 30px 0;
          display: inline-block;
          text-transform: uppercase;
          font-weight: 600;

          &:hover {
            color: #1890ff;
          }
        }
      }

      li:not(:last-child) {
        margin: 0 20px;
      }
    }

    @media screen and (max-width: 750px) {
      padding: 30px;

      &__logo {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        > .cart,
        .burger {
          cursor: pointer;
          display: block;
        }

        .burger {
          .line {
            width: 23px;
            height: 2px;
            margin: 6px 0;
            background: black;
            transition: transform 0.3s;

            ${({ isNavOn }) =>
              isNavOn &&
              `
              &:first-child {
                transform: rotate(45deg) translate(6px, 4px);
              }
              &:nth-child(2) {
                visibility: hidden;
              }
              &:last-child {
                transform: rotate(-45deg) translate(7px, -6px);
              }
            `}
          }
        }

        .cart i {
          font-size: 26px;
        }
      }

      &__nav {
        li:last-child {
          display: none;
        }

        transform: translateX(30vw);
        transition: all .5s;
        display: flex;
        position: absolute;
        top: 92.73px;
        width: 30%;
        right: 0;
        flex-direction: column;
        justify-content: space-around;
        height: calc(100vh - 92.73px);
        background-color: #97c0e8;
        color: white;
        opacity: 0;

        ${({ isNavOn }) =>
          isNavOn &&
          `
        transform: translateX(0);
        opacity: 1;
        li a {
        color: white;
        }
        `}
    }
  }

  section.content {
    height: 100vh;
    background-color: #f7f7f7;
  }
`;

const Books = () => {
  const [isNavOn, setNavOn] = useState(false);

  return (
    <StyledHeader isNavOn={isNavOn}>
      <div className="header">
        <div className="header__logo">
          <div className="cart">
            <Cart quantity={2} />
          </div>
          <a href="/" className="logo">
            Book Store
          </a>
          <div className="burger" onClick={() => setNavOn(!isNavOn)}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
        <ul className="header__nav">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/shop">Shop</NavLink>
          </li>
          <li>
            <NavLink to="###">Sign Up</NavLink>
          </li>
          <li>
            <NavLink to="###">Sign In</NavLink>
          </li>
          <li>
            <div className="cart">
              <Cart quantity={2} />
            </div>
          </li>
        </ul>
      </div>
    </StyledHeader>
  );
};

export default Books;
