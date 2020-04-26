import React from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import styled from 'styled-components';
import selfHelpImg from './self-help.jpg';
import theStar from './theStarAndShamrock.jpg';

const Container = styled.section`
  background: #f7f7f7;
  padding: 100px 70px 150px 70px;

  .item {
    background-color: white;
    height: auto;
    padding: 20px;
    font-weight: 600;

    &:first-child {
      position: relative;

      &::before {
        position: absolute;
        content: 'New';
        background: #97c0e8;
        color: white;
        width: 45px;
        height: 28px;
        text-align: center;
        line-height: 28px;
      }
    }
    a {
      height: 100%;
      display: block;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      > p {
        color: black;
      }

      .image {
        margin-bottom: 15px;

        img {
          height: 200px;
          max-width: 100%;
        }
      }
    }
  }

  .swiper-button-prev {
    left: -5px;

    &::after {
      font-size: 25px;
    }
  }

  .swiper-button-next {
    right: -5px;

    &::after {
      font-size: 25px;
    }
  }

  @media screen and (max-width: 480px) {
    padding: 100px 30px;

    .item {
      height: 300px;

      div.image img {
        height: 200px;
      }
    }
  }
`;

const MutipleSlidesPerView = () => {
  const params = {
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    loop: true,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        centeredSlides: true,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      // when window width is >= 750px
      750: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      // when window width is >= 1024px
      1024: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  };
  return (
    <Container>
      <Swiper {...params}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
          <div key={index} className="item">
            <a href="###">
              <div className="image">
                <img src={item % 2 === 0 ? theStar : selfHelpImg} alt="book" />
              </div>
              <p>The Star and the Shamrock</p>
            </a>
          </div>
        ))}
      </Swiper>
    </Container>
  );
};
export default MutipleSlidesPerView;
