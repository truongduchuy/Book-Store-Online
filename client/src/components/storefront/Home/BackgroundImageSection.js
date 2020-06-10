import React from 'react';
import styled from 'styled-components';

const Container = styled.section`
  height: calc(100vh - 67px);
  display: flex;
  background-color: #fff;

  > div {
    flex: 1;
  }

  > .heading {
    position: relative;

    > div {
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      h2 {
        color: #97c0e8;
        font-size: 50px;
        font-weight: 100;
      }

      p {
        font-size: 20px;
      }
    }
  }

  .img-box {
    overflow: hidden;

    > div {
      background: url(${({ img }) => img});
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      height: 100%;
      transition: transform 0.5s;
    }

    &:hover {
      > div {
        transform: scale(1.2);
      }
    }
  }

  @media screen and (max-width: 750px) {
    flex-direction: column;
    height: 600px;

    .heading > div > h2 {
      font-size: 40px;
    }
  }

  @media screen and (max-width: 480px) {
    .heading > div {
      > h2 {
        font-size: 30px;
      }
    }
  }
`;

const BackgroundImage = () => {
  return (
    <Container img="https://res.cloudinary.com/dm1wgyp1n/image/upload/v1588132252/reading_ok2spb.jpg">
      <div className="heading">
        <div>
          <h2>One of a Kind Items</h2>
          <p>Easy, Fun Shopping</p>
        </div>
      </div>
      <div className="img-box">
        <div></div>
      </div>
    </Container>
  );
};

export default BackgroundImage;
