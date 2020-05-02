import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { object, string } from 'yup';
import { connect } from 'react-redux';

import Table from 'antd-components/table';
import Button from 'antd-components/button';
import Field from 'antd-components/field';
import Input from 'antd-components/input';
import Popconfirm from 'antd-components/popConfirm';
import Modal from 'antd-components/modal';
import { createAction } from 'dorothy/utils/index';
import {
  GENRES_REQUEST,
  GENRE_ADD_REQUEST,
  GENRE_DELETE_REQUEST,
  GENRE_EDIT_REQUEST,
  SEARCH_VALUE_CHANGE,
} from './ducks';
import withHeader from '../withHeader';
import ActionsBox from '../ActionsBox';

const Container = styled.div`
  padding: 50px 100px;

  .table-box {
    margin-top: 30px;
  }
`;

const StyledForm = styled.div`
  .action-box {
    display: flex;
    justify-content: flex-end;

    > button:nth-child(2) {
      margin-left: 20px;
    }
  }

  .field-group > div {
    margin-bottom: 30px;
  }
`;

const validationSchema = object().shape({
  name: string().required(),
});

const Genres = ({ genreStore, dispatch }) => {
  const [modalData, setModalData] = useState({ isOpen: false, editingId: '' });

  const { isOpen, editingId } = modalData;

  const { genres, isWaitingGenres } = genreStore;

  useEffect(() => {
    dispatch(createAction(GENRES_REQUEST));
  }, [dispatch]);

  const handleCloseModal = () => {
    setModalData({ isOpen: false, editingId: '' });
  };

  const onSubmit = values => {
    if (editingId !== '') {
      dispatch(createAction(GENRE_EDIT_REQUEST, { id: editingId, data: values }));
    } else {
      dispatch(createAction(GENRE_ADD_REQUEST, values));
    }
    handleCloseModal();
  };

  const genre = genres.find(genre => genre._id === editingId);

  const renderForm = ({ handleSubmit, ...form }) => (
    <Form className="form">
      <div className="field-group">
        <Field
          form={form}
          inline
          name="name"
          label="Genre"
          value={editingId !== '' ? genre.name : ''}
          component={Input}
        />
      </div>
      <div className="action-box">
        <Button size="large" htmlType="submit" type="primary" onClick={handleSubmit}>
          Save
        </Button>
        <Button size="large" onClick={handleCloseModal}>
          Cancel
        </Button>
      </div>
    </Form>
  );

  const initialValues = {
    name: '',
  };

  const columns = [
    {
      title: '#',
      key: '_id',
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: 'Genre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Operation',
      render: (name, record) => (
        <>
          <Button onClick={() => setModalData({ ...modalData, editingId: record._id })} type="link">
            Edit
          </Button>
          <Popconfirm
            placement="topRight"
            title="Are you sure to delete?"
            onConfirm={() => dispatch(createAction(GENRE_DELETE_REQUEST, record._id))}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link">Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <Container>
      {(isOpen || editingId !== '') && (
        <Modal
          title={editingId ? 'Edit Genre' : 'New Genre'}
          visible={isOpen || editingId !== ''}
          onCancel={handleCloseModal}
        >
          <StyledForm>
            <Formik
              validateOnChange={false}
              validateOnBlur={false}
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              component={renderForm}
            />
          </StyledForm>
        </Modal>
      )}
      <ActionsBox
        title="Genres"
        buttonLabel="New Genre"
        onSearch={value => dispatch(createAction(SEARCH_VALUE_CHANGE, value))}
        onClick={() => setModalData({ isOpen: true, editingId: '' })}
      />
      <div className="table-box">
        <Table
          bordered
          rowKey={(row, index) => index}
          dataSource={genres}
          columns={columns}
          size="small"
          loading={isWaitingGenres}
        />
      </div>
    </Container>
  );
};

export default connect(state => ({
  genreStore: state.genre,
}))(withHeader(Genres));
