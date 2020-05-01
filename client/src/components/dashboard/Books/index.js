import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Popconfirm from 'antd-components/popConfirm';
import withHeader from '../withHeader';
import { BOOKS_REQUEST, BOOK_DELETE_REQUEST } from './ducks';
import ActionsBox from 'components/dashboard/ActionsBox';
import PaginationBox from 'antd-components/pagination';
import Table from 'antd-components/table';
import Button from 'antd-components/button';
import { createAction } from 'dorothy/utils';
import FormModal from './FormModal';

const pageSize = process.env.REACT_APP_PAGE_SIZE;

const StyledContent = styled.div`
  padding: 50px 100px;

  .table-box {
    margin-top: 30px;
  }
`;

const Books = ({ bookStore, dispatch }) => {
  const [page, setPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const { books, isWaitingBooks } = bookStore;
  const { total, data } = books;

  useEffect(() => {
    dispatch(createAction(BOOKS_REQUEST, { page: 1, size: pageSize }));
  }, [dispatch]);

  const handleSearch = value => {
    setPage(1);
    dispatch(createAction(BOOKS_REQUEST, { page: 1, size: pageSize, searchValue: value }));
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const columns = [
    {
      title: '#',
      key: '_id',
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      Title: '',
      dataIndex: 'imageUrl',
      render: (text, record) => (
        <div>
          <img style={{ maxWidth: '100px' }} src={record.imageUrl} alt={record.title} />
        </div>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: text => <div style={{ fontWeight: '500' }}>{text}$</div>,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Genre',
      dataIndex: 'genre',
      render: genre => <div>{genre?.name}</div>,
    },
    {
      title: 'Operation',
      render: (name, record) => (
        <div style={{ display: 'flex' }}>
          <Button onClick={() => console.log('edit book')} type="link">
            Edit
          </Button>
          <Popconfirm
            placement="topRight"
            title="Are you sure to delete?"
            onConfirm={() => dispatch({ type: BOOK_DELETE_REQUEST, payload: record._id })}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link">Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  console.log(books);

  return (
    <StyledContent>
      <ActionsBox
        title="Books"
        buttonLabel="New Book"
        onClick={() => setModalOpen(true)}
        onSearch={handleSearch}
      />
      <div className="table-box">
        <Table
          bordered
          rowKey={(row, index) => index}
          dataSource={data.length > 0 ? data : null}
          columns={columns}
          loading={isWaitingBooks}
        />
      </div>
      <PaginationBox
        pageSize={Number(pageSize)}
        total={total}
        current={page}
        onChange={page => {
          setPage(page);
          dispatch(createAction(BOOKS_REQUEST, { page, size: pageSize }));
        }}
      />
      <FormModal title="Create a new book" visible={isModalOpen} onClose={handleCloseModal} />
    </StyledContent>
  );
};

export default connect(state => ({ bookStore: state.book }))(withHeader(Books));
