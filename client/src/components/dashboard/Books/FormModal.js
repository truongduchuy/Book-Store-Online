import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Drawer from 'antd-components/drawer';
import { object, string, number } from 'yup';
import { Icon, Upload } from 'antd';
import { Formik, Form } from 'formik';
import Field from 'antd-components/field';
import Button from 'antd-components/button';
import Notification from 'antd-components/notification';
import Input, { TextAreaInput } from 'antd-components/input';
import Select from 'antd-components/select';
import { GENRES_REQUEST } from '../Genres/ducks';
import { BOOK_ADD_REQUEST, BOOK_UPDATE_REQUEST } from './ducks';

const StyledForm = styled.div`
  .row {
    display: flex;
    justify-content: space-between;

    &:nth-child(1) > div,
    &:nth-child(2) > div {
      width: calc(50% - 20px);
    }

    &:nth-child(3) > div {
      width: 100%;
    }

    &:nth-child(4) {
      display: block;
    }

    &:last-child {
      justify-content: flex-end;
    }
  }
`;

const validationSchema = object().shape({
  title: string().required(),
  description: string().required(),
  price: number().required(),
  quantity: number().required(),
  genre: string().required(),
});

const FormModal = ({
  onClose,
  visible,
  name,
  genreStore,
  isWaitingAdd,
  dispatch,
  editingBook,
  isWaitingUpdate,
}) => {
  const [fileList, setFileList] = useState([]);
  const { title, description, price, quantity, genre, _id } = editingBook || {};

  const initialValues = {
    title: title || '',
    description: description || '',
    price: price || '',
    quantity: quantity || '',
    genre: genre?._id || '',
  };

  const handleFile = file => {
    if (!file.name.match(/\.(jpe|jpeg|png|jpg|gif)$/))
      Notification.error('Please upload an Image file!');
    else setFileList([file]);
    return false;
  };

  useEffect(() => {
    dispatch({
      type: GENRES_REQUEST,
    });
  }, [dispatch]);

  const renderForm = ({ handleSubmit, ...form }) => (
    <Form className="form">
      <StyledForm>
        <div className="row">
          <Field form={form} name="title" label="Title" component={Input} />
          <Field form={form} name="price" type="number" label="Price" component={Input} />
        </div>
        <div className="row">
          <Field
            form={form}
            name="genre"
            label="Genre"
            loading={genreStore.isWaitingGenres}
            options={genreStore.genres.map(({ name, _id }) => ({ name, value: _id }))}
            component={Select}
          />
          <Field form={form} name="quantity" type="number" label="Quantity" component={Input} />
        </div>
        <div className="row">
          <Field
            form={form}
            name="description"
            label="Description"
            rows={4}
            component={TextAreaInput}
          />
        </div>
        <div style={{ marginBottom: '90px' }} className="row">
          <p style={{ marginBottom: '12px' }}>Image</p>
          <Upload
            name="book-image"
            beforeUpload={handleFile}
            showUploadList
            fileList={fileList}
            onRemove={() => setFileList([])}
          >
            <Button>
              <Icon type="upload" /> {editingBook ? 'Update Image' : 'Click to Upload'}
            </Button>
          </Upload>
        </div>
        <div className="row">
          <Button
            style={{ marginRight: '20px' }}
            htmlType="submit"
            onClick={handleSubmit}
            disabled={fileList.length === 0 && !editingBook}
            loading={isWaitingAdd || isWaitingUpdate}
          >
            Submit
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </StyledForm>
    </Form>
  );

  const onSubmit = values => {
    if (!editingBook) {
      const payload = {
        ...values,
        image: fileList[0],
        callBack: data => {
          if (data) Notification.success('Book Created Successfully!');
          else Notification.error('Create Book Failed!');
          onClose();
        },
      };
      dispatch({ type: BOOK_ADD_REQUEST, payload });
    } else {
      console.log(values);
      dispatch({
        type: BOOK_UPDATE_REQUEST,
        payload: {
          ...values,
          _id,
          image: fileList[0],
          callBack: data => {
            if (data) Notification.success('Book Updated Successfully!');
            else Notification.error('Update Book Failed!');
            onClose();
          },
        },
      });
    }
  };

  return (
    <Drawer
      title={name}
      width={500}
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 20 }}
    >
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        component={renderForm}
      />
    </Drawer>
  );
};

export default connect(state => ({
  genreStore: state.genre,
  isWaitingAdd: state.book.isWaitingAdd,
  isWaitingUpdate: state.book.isWaitingUpdate,
}))(FormModal);
