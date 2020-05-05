import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Popconfirm from 'antd-components/popConfirm';
import withHeader from '../withHeader';
import { BOOKS_REQUEST, BOOK_DELETE_REQUEST } from './ducks';
import ActionsBox from 'components/dashboard/ActionsBox';
import PaginationBox from 'antd-components/pagination';
import Notification from 'antd-components/notification';
import Table from 'antd-components/table';
import Button from 'antd-components/button';
import { createAction } from 'dorothy/utils';
import FormModal from './FormModal';
import ExpandedRow from './ExpandedRow';

const pageSize = 5;

const StyledContent = styled.div`
  padding: 50px 100px;

  .table-box {
    margin-top: 30px;
  }
`;

const Books = ({ bookStore, dispatch }) => {
  const [editingId, setEditingId] = useState(null);
  const [page, setPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const { books, isWaitingBooks } = bookStore;
  const { total, data } = books;

  useEffect(() => {
    dispatch(createAction(BOOKS_REQUEST, { page: 1, size: pageSize }));
  }, [dispatch]);

  const handleSearch = value => {
    setPage(1);
    setSearchValue(value);
    dispatch(createAction(BOOKS_REQUEST, { page: 1, size: pageSize, searchValue: value }));
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingId(null);
  };

  const handleEdit = id => {
    setEditingId(id);
    setModalOpen(true);
  };

  const handleDelete = id => {
    dispatch({
      type: BOOK_DELETE_REQUEST,
      payload: {
        id,
        callBack: success => {
          if (success) Notification.success('Book Deleted Successfully!');
          else Notification.error('Delete Book Failed!');
        },
      },
    });
  };

  const handleExpandRow = rowKey => {
    if (expandedRowKeys[0] === rowKey) setExpandedRowKeys([]);
    else setExpandedRowKeys([rowKey]);
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
        <a href={`/shop/${record.title}`} target="_blank" rel="noopener noreferrer">
          <img style={{ maxWidth: '100px' }} src={record.imageUrl} alt={record.title} />
        </a>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      width: '150px',
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
          <Button onClick={() => handleEdit(record._id)} type="link">
            Edit
          </Button>
          <Popconfirm
            placement="topRight"
            title="Are you sure to delete?"
            onConfirm={() => handleDelete(record._id)}
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
          expandedRowKeys={expandedRowKeys}
          onExpandedRowsChange={expandedRows => {
            handleExpandRow(expandedRows[expandedRows.length - 1]);
          }}
          expandedRowRender={record => <ExpandedRow bookId={record._id} />}
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
          dispatch(createAction(BOOKS_REQUEST, { page, size: pageSize, searchValue }));
        }}
      />
      {isModalOpen && (
        <FormModal
          name={editingId ? 'Edit Book' : 'Create a new book'}
          editingBook={data.find(book => book._id === editingId)}
          visible={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </StyledContent>
  );
};

export default connect(state => ({ bookStore: state.book }))(withHeader(Books));
