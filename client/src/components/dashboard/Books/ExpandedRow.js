import React, { useEffect } from 'react';
import Table from 'antd-components/table';
import moment from 'moment';
import Button from 'antd-components/button';
import Popconfirm from 'antd-components/popConfirm';
import { connect } from 'react-redux';
import { REVIEWS_REQUEST, REVIEW_DELETE_REQUEST } from './ducks';
import PaginationBox from 'antd-components/pagination';

const pageSize = 5;

const ExpandedRow = ({ bookId, review, dispatch, isWaitingReviews }) => {
  const { reviews, total } = review;

  useEffect(() => {
    dispatch({ type: REVIEWS_REQUEST, payload: { id: bookId, size: pageSize, page: 1 } });
  }, [dispatch, bookId]);

  const columns = [
    {
      title: '#',
      key: '_id',
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: 'Reviewer',
      dataIndex: 'reviewer',
      render: reviewer => <span>{reviewer?.username}</span>,
    },
    {
      title: 'Heading',
      dataIndex: 'heading',
    },
    {
      title: 'Body',
      dataIndex: 'body',
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
    },
    {
      title: 'Reviewed Date',
      dataIndex: 'createdAt',
      render: data => <span>{moment(data).format('YYYY/MM/DD - HH:mm')}</span>,
    },
    {
      title: 'Operation',
      render: (name, record) => (
        <Popconfirm
          placement="topRight"
          title="Are you sure to delete?"
          onConfirm={() =>
            dispatch({ type: REVIEW_DELETE_REQUEST, payload: { id: record._id, bookId } })
          }
          okText="Yes"
          cancelText="No"
        >
          <Button type="link">Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <Table
        bordered
        rowKey={(row, index) => index}
        dataSource={reviews}
        columns={columns}
        size="small"
        loading={isWaitingReviews}
      />
      <PaginationBox
        pageSize={Number(pageSize)}
        total={total}
        onChange={page => {
          dispatch({ type: REVIEWS_REQUEST, payload: { page, size: pageSize, id: bookId } });
        }}
      />
    </div>
  );
};

export default connect((state, ownProps) => ({
  review: state.book.reviewData.find(item => item.bookId === ownProps.bookId) || [],
  isWaitingReviews: state.book.isWaitingReviews,
}))(ExpandedRow);
