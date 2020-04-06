import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon, Input } from 'antd'
import Search from './Search'

const StyledHeader = styled.header`
  background: black;

  .header {

    &__upper {
      color: #fff;
      display: flex;
      padding: 15px 50px;
      justify-content: space-between;
      align-items: center;

      .burger {
        display: none;
        cursor: pointer;
        
        div {
          background-color: white;
          width: 20px;
          height: 2px;
          margin: 5px;
          transition: all .3s;
        }

        ${({ isNavOn }) => isNavOn && `
        .line:nth-child(1) {
          transform: rotate(-45deg) translate(-6px, 4px);
        }

        .line:nth-child(2) {
          opacity: 0;
        }

        .line:nth-child(3) {
          transform: rotate(45deg) translate(-5px,-4px);
        }
        `}
      }

      .logo {
        font-size: 36px;
        text-transform: uppercase;
        font-family: 'Unica One', cursive;
        letter-spacing: 2px;
        color: #fff;
        text-decoration: none;
      }

      .cart {
        font-size: 20px;

        > * {
          cursor: pointer;
        }

        > i:nth-child(2) {
          margin-left: 20px;
          position: relative;
          
          &::after {
            content: '';
            height: 10px;
            width: 10px;
            border-radius: 100%;
            position: absolute;
            background-color: #006eff;
            top: 0px;
            right: -3px;
          }
        }


      }
    }

    &__nav {
      padding: 15px 50px;
      border-top: 1px solid #101010;

      ul {
        margin-left: -20px;
        list-style-type: none;

        li {
          display: inline-block;
          text-transform: uppercase;
          
          a {
            padding: 20px;
            color: #fff;
            font-family: 'Karla', sans-serif;
            font-weight: bold;
          }
        }

        li:nth-child(3) {
          display: none;
        }

        @media screen and (max-width: 750px) {
          li {
            margin-bottom: 20px;
          }

          li:nth-child(3) {
            display: inline-block;
            padding-left: 20px;
          }
          
        }

      }
    }
  }

  @media screen and (max-width: 750px){
    .header {
      &__upper {
        padding: 15px 20px;
        .burger {
          display: block;
        }

        .cart {
          >*:first-child {
            display: none;
          }

          >i:nth-child(2) {
            font-size: 24px;
          }
        }
      }

      &__nav {
      ${({ isNavOn }) => isNavOn ? `
        padding-left: 20px;

        ul {
          display: flex;
          flex-direction: column;
        }
        ` : `display: none;`}
      }
    }
  }

`;

const Books = () => {
  const [isSearching, setSearching] = useState(false)
  const [isNavOn, setNavOn] = useState(false)

  return (
    <>
      <StyledHeader isNavOn={isNavOn}>
        <div className="header__upper">
          <div className="burger" onClick={() => setNavOn(!isNavOn)}>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
          </div>
          <a className="logo">
            BookShelf
          </a>
          <div className="cart">
            <Search
              isSearching={isSearching}
              onSearch={value => console.log(value)}
              setSearchOn={() => setSearching(true)}
              setSearchOff={() => setSearching(false)}
            />
            <Icon type="shopping-cart" />
          </div>
        </div>
        <div className="header__nav">
          <ul>
            <li>
              <a href="##">Home</a>
            </li>
            <li>
              <a href="##">Catalog</a>
            </li>
            <li>
              <Input.Search
                placeholder="search"
                onSearch={value => console.log(value)}
                style={{ width: 200 }}
              />
            </li>
          </ul>
        </div>
      </StyledHeader>
      <div style={{ height: '200vh' }}></div>
    </>
  )
}

export default Books;
