import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Spin, Icon } from 'antd';
import { connect } from 'react-redux';
import PaginationBox from 'antd-components/pagination';
import { Link } from 'react-router-dom';
import Layout from '../Layout';
import { GENRES_REQUEST } from 'components/dashboard/Genres/ducks';
import { BOOKS_REQUEST } from 'components/dashboard/Books/ducks';
import { Search } from 'antd-components/input';

const pageSize = 6;

const StyledContent = styled.div`
  display: flex;
  margin: 100px -20px;
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
        padding: 20px;
        width: 100%;
      }

      .ant-input-suffix {
        font-size: 18px;
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

          &.active {
            color: #1890ff;
          }
        }
      }
    }
  }

  .books-box {
    flex-basis: 75%;

    .books {
      display: flex;
      flex-wrap: wrap;

      .wrapper {
        padding: 0 20px;
        width: 33.33%;
        margin-bottom: 50px;
        height: auto;

        .item {
          border: 1px solid #eee;
          transition: all 0.4s;

          :hover {
            box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.3);
          }

          &__image-box {
            position: relative;

            &:hover .actions {
              opacity: 1;

              a {
                transform: translate(-50%, -50%);
              }
            }

            > a {
              display: flex;
              justify-content: center;
              padding: 20px 0;

              > img {
                max-width: 100%;
              }
            }

            .actions {
              opacity: 0;
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-color: rgba(0, 0, 0, 0.06);
              transition: all 0.3s;

              a {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) translateY(80px);
                transition: all 0.3s;
                padding: 10px 15px;
                background-color: #006eff;
                color: #fff;

                font-size: 0.8125em;
                font-weight: 700;
                letter-spacing: 0.15em;
                text-transform: uppercase;
                padding: 15px 45px;

                &:hover {
                  background-color: #0058cc;
                }
              }
            }
          }

          &__content {
            border-top: 1px solid #eee;
            font-weight: 700;
            padding: 10px;

            a {
              max-width: 100%;
              white-space: nowrap;
              overflow: hidden !important;
              text-overflow: ellipsis;
              display: inline-block;
            }

            p {
              margin-top: 10px;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 30px;

    .books-box .books {
      .wrapper {
        width: 50%;
      }
    }
  }

  @media screen and (max-width: 480px) {
    .books-box .books .wrapper {
      width: 100%;
    }
  }
`;

const Shop = ({ genreStore, dispatch, bookStore }) => {
  const [genreId, setGenreId] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const { genres } = genreStore;
  const { books, isWaitingBooks } = bookStore;

  useEffect(() => {
    dispatch({ type: GENRES_REQUEST });
    dispatch({ type: BOOKS_REQUEST, payload: { size: pageSize, page: 1 } });
  }, [dispatch]);

  const handlesearch = (value, id = null) => {
    setSearchValue(value);
    setPage(1);
    dispatch({
      type: BOOKS_REQUEST,
      payload: { size: pageSize, page: 1, searchValue: value, genreId: id },
    });
  };

  const onChooseCategory = id => {
    setGenreId(id);
    handlesearch(searchValue, id);
  };

  return (
    <Layout pages={['Home', 'Shop']}>
      <StyledContent>
        <div className="filter-box">
          <div>
            <h2>Search</h2>
            <Search placeholder="search" onSearch={value => handlesearch(value, genreId)} />
          </div>
          <div>
            <h2>Categories</h2>
            <ul>
              <li className={!genreId ? 'active' : null} onClick={() => onChooseCategory(null)}>
                All
              </li>
              {genres.map(genre => (
                <li
                  className={genre._id === genreId ? 'active' : null}
                  onClick={() => onChooseCategory(genre._id)}
                  key={genre._id}
                >
                  {genre.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {isWaitingBooks ? (
          <div style={{ margin: '15px auto' }}>
            <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />
          </div>
        ) : (
          <div className="books-box">
            <div className="books">
              {books.data.map(book => {
                const { _id, price, title, imageUrl } = book;
                return (
                  <div className="wrapper" key={_id}>
                    <div className="item">
                      <div className="item__image-box">
                        <a href={`/shop/${title}`}>
                          <img src={imageUrl} alt="img" />
                        </a>
                        <div className="actions">
                          <Link to={`/shop/${title}`}>View</Link>
                        </div>
                      </div>
                      <div className="item__content">
                        <Link to={`/shop/${title}`}>{title}</Link>
                        <p>${price}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {books.total > 0 && (
              <PaginationBox
                pageSize={pageSize}
                total={books.total}
                current={page}
                onChange={page => {
                  setPage(page);
                  dispatch({
                    type: BOOKS_REQUEST,
                    payload: { size: pageSize, page, searchValue, genreId },
                  });
                  document
                    .querySelector('.heading')
                    .scrollIntoView({ behavior: 'smooth', block: 'end' });
                }}
              />
            )}
          </div>
        )}
      </StyledContent>
    </Layout>
  );
};

export default connect(state => ({ genreStore: state.genre, bookStore: state.book }))(Shop);
