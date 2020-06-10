import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import styled from 'styled-components';
import { BOOKS_REQUEST } from 'components/dashboard/Books/ducks';
import { NavLink } from 'react-router-dom';

const Container = styled.section`
  background: #f7f7f7;
  padding: 100px 70px 150px 70px;

  > .heading {
    display: flex;
    justify-content: space-between;
    align-items: center;

    > h2 {
      text-transform: uppercase;
    }
  }

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
        text-align: center;
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
      font-size: 20px;
    }
  }

  .swiper-button-next {
    right: -5px;

    &::after {
      font-size: 20px;
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

const pageSize = 10;

const MutipleSlidesPerView = ({ dispatch, books }) => {
  useEffect(() => {
    dispatch({ type: BOOKS_REQUEST, payload: { page: 1, size: pageSize } });
  }, [dispatch]);
  const params = {
    autoplay: {
      delay: 2500,
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
      {books.length === 0 ? (
        <div>loading...</div>
      ) : (
        <>
          <div className="heading" style={{ marginBottom: '20px' }}>
            <h2>Featured Products</h2>
            <NavLink to="/shop">View All</NavLink>
          </div>
          <Swiper {...params}>
            {books.map(({ _id, title, imageUrl }, index) => (
              <div key={_id} className="item">
                <a href={`/shop/${title}`}>
                  <div className="image">
                    <img src={imageUrl} alt="book" />
                  </div>
                  <p>{title}</p>
                </a>
              </div>
            ))}
          </Swiper>
        </>
      )}
    </Container>
  );
};
export default connect(({ book }) => ({ books: book.books?.data }))(MutipleSlidesPerView);
