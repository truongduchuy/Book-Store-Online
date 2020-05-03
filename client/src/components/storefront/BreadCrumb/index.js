import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BreadImg from './bread.jpg';
import lodash from 'lodash';

const StyledImage = styled.div`
  height: 200px;
  position: relative;

  > img {
    height: 200px;
    width: 100%;
  }

  > div:nth-child(2) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    h1 {
      font-size: 35px;
    }

    .bread-crumb {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;

      span {
        margin: 0 10px;
      }
    }
  }

  @media screen and (max-width: 480px) {
    > img {
      width: initial;
    }

    > div:nth-child(2) {
      transform: translate(0, -50%);
      left: 0;
      right: 0;
      padding: 0 30px;
    }
  }
`;

const BreadCrumb = ({ pages }) => {
  if (!pages) return null;
  return (
    <StyledImage>
      <img src={BreadImg} alt="bread" />
      <div className="heading">
        <h1>{lodash.upperFirst(pages[pages.length - 1])}</h1>
        <div className="bread-crumb">
          {pages.map((page, index) =>
            index !== pages.length - 1 ? (
              <div key={index}>
                <Link to={`/${page !== 'Home' ? page : ''}`}>{lodash.upperFirst(page)}</Link>
                <span>/</span>
              </div>
            ) : (
              <p key={index}>{lodash.upperFirst(page)}</p>
            ),
          )}
        </div>
      </div>
    </StyledImage>
  );
};

export default BreadCrumb;
