import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BreadImg from './bread.jpg';

const StyledImage = styled.div`
  position: relative;

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
      span {
        margin: 0 10px;
      }
    }
  }
`;

const BreadCrumb = ({ pages }) => {
  return (
    <StyledImage>
      <img src={BreadImg} alt="bread" />
      <div className="heading">
        <h1>{pages[pages.length - 1]}</h1>
        <div className="bread-crumb">
          {pages.map((page, index) =>
            index !== pages.length - 1 ? (
              <>
                <Link to={`/${page !== 'Home' ? page : ''}`}>{page}</Link>
                <span>/</span>
              </>
            ) : (
              page
            ),
          )}
        </div>
      </div>
    </StyledImage>
  );
};

export default BreadCrumb;
