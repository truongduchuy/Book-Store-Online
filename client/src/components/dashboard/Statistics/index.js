import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import Table from 'antd-components/table';
import Button from 'antd-components/button';
import { RangePicker } from 'antd-components/date-picker';
import { Select } from 'antd';
import 'antd/es/select/style/css';
import withHeader from '../withHeader';
import { BEST_SELLER_REQUEST } from './ducks';
import { GENRES_REQUEST } from '../Genres/ducks';

const { Option } = Select;

const Container = styled.div`
  padding: 50px 100px;

  > *:first-child,
  > *:nth-child(2) {
    margin-right: 30px;
  }

  .table-box {
    margin-top: 30px;
  }

  > div:last-child {
    margin-top: 40px;
    display: flex;
    justify-content: flex-end;

    > *:nth-child(2) {
      margin-left: 20px;
      font-weight: 500;
    }
  }

  .revenue-box {
    margin-right: 30px;
    font-size: 20px;

    p:nth-child(2) {
      font-weight: 500;
    }
  }
`;

const columns = [
  {
    title: '#',
    key: '_id',
    render: (text, record, index) => <span>{index + 1}</span>,
    width: 50,
  },
  {
    title: '',
    dataIndex: 'imageUrl',
    render: imageUrl => <img style={{ maxWidth: '110px' }} src={imageUrl} alt="book" />,
    width: 135,
  },
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    render: price => <span>${price}</span>,
  },
  {
    title: 'Genre',
    dataIndex: 'genreName',
  },
  {
    title: 'Sold',
    dataIndex: 'sold',
  },
];

const Statistics = ({ dispatch, statisticsStore, genreStore }) => {
  const [selectValue, setselectValue] = useState('All');
  const { genres, isWaitingGenres } = genreStore;
  const { books, isWaitingData } = statisticsStore;
  const [dateArray, setdateArray] = useState([]);

  useEffect(() => {
    dispatch({ type: GENRES_REQUEST });
  }, [dispatch]);

  function onChange(value, dateString) {
    setdateArray(dateString);
  }

  const handleStatistics = () => {
    const [startDate, endDate] = dateArray;

    dispatch({
      type: BEST_SELLER_REQUEST,
      payload: {
        startDate,
        endDate,
        genreId: selectValue,
      },
    });
  };

  const revenue = books.reduce((acc, { sold, price }) => acc + sold * price, 0);

  return (
    <Container>
      <RangePicker
        format="YYYY/MM/DD"
        placeholder={['Start Date', 'End Date']}
        onChange={onChange}
      />
      <Select
        value={selectValue}
        style={{ width: 120 }}
        onChange={value => setselectValue(value)}
        loading={isWaitingGenres}
      >
        <Option value="All">All</Option>
        {genres.map(({ _id, name }) => (
          <Option value={_id}>{name}</Option>
        ))}
      </Select>
      <Button type="primary" ghost onClick={handleStatistics}>
        <Icon type="bar-chart" /> Statistics
      </Button>
      <div className="table-box">
        <Table
          bordered
          rowKey={(row, index) => index}
          dataSource={books[0]?.title ? books : []}
          columns={columns}
          // size="small"
          loading={isWaitingData}
          scroll={{ y: 500 }}
        />
      </div>
      <div className="revenue-box">
        <p>Revenue</p>
        <p>${revenue}</p>
      </div>
    </Container>
  );
};

export default connect(({ statistics, genre }) => ({
  statisticsStore: statistics,
  genreStore: genre,
}))(withHeader(Statistics));
