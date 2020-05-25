import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Menu, Dropdown, Icon } from 'antd';
import 'antd/es/dropdown/style/css';
import 'antd/es/menu/style/css';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Cart from './Cart';
import { LOGOUT } from '../Customer/ducks';

const StyledHeader = styled.header`
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 10;
  
  a {
    color: black;
  }

  .header {
    background: white;
    display: flex;
    justify-content: space-between;
    padding: 0 70px;
    align-items: center;
    box-shadow: 0 0 2px 0 rgba(56, 69, 84, 0.2);

    &__logo {
      a {
        font-size: 22px;
        color: black;
        letter-spacing: 2px;
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
          padding: 20px 0;
          display: inline-block;
          text-transform: none;
          font-weight: 400;

          &:hover, &.active {
            color: #1890ff;
          }
        }
      }

      li:not(:last-child) {
        margin: 0 20px;
      }
    }

    @media screen and (max-width: 750px) {
      padding: 20px 30px;

      &__logo {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        > .cart,
        .burger {
          display: block;
        }
        
        .burger {
          cursor: pointer;

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
      }

      &__nav {
        li:last-child {
          display: none;
        }

        transform: translateY(-500px);
        transition: all .5s;
        display: flex;
        position: absolute;
        top: 73px;
        width: 100%;
        right: 0;
        flex-direction: column;
        justify-content: space-around;
        background-color: #97c0e8;
        color: white;
        opacity: 0;
        z-index: -1;

        ${({ isNavOn }) =>
          isNavOn &&
          `
        transform: translateY(0);
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

const Books = ({ username, dispatch, history }) => {
  const [isNavOn, setNavOn] = useState(false);

  const menu = (
    <Menu>
      <Menu.Item>
        <div
          aria-hidden="true"
          onClick={() => {
            dispatch({ type: LOGOUT });
            history.push('/login');
          }}
        >
          Log out
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <StyledHeader isNavOn={isNavOn}>
      <div className="header">
        <div className="header__logo">
          <div className="cart">
            <Cart />
          </div>
          <NavLink to="/" className="logo">
            HUY TRU STORE
          </NavLink>
          <div className="burger" aria-hidden="true" onClick={() => setNavOn(!isNavOn)}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
        <ul className="header__nav">
          <li>
            <NavLink to="/shop">Shop</NavLink>
          </li>
          {!username ? (
            <>
              <li>
                <NavLink to="/login">Log In</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
            </>
          ) : (
            <li>
              <Dropdown overlay={menu}>
                <NavLink to="/customer" className="ant-dropdown-link" style={{ padding: 0 }}>
                  <span style={{ textTransform: 'none' }}>{username}</span> <Icon type="down" />
                </NavLink>
              </Dropdown>
            </li>
          )}
          <li>
            <div className="cart">
              <Cart />
            </div>
          </li>
        </ul>
      </div>
    </StyledHeader>
  );
};

export default connect(state => ({
  username: state.customer.customer?.username,
}))(withRouter(Books));
