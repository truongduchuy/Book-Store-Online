import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Descriptions } from 'antd';
import Button from 'antd-components/button';
import Notification from 'antd-components/notification';
import 'antd/es/descriptions/style/css';
import { object, string } from 'yup';
import { Formik, Form } from 'formik';
import Field from 'antd-components/field';
import Input from 'antd-components/input';
import Modal from 'antd-components/modal';
import { CUSTOMER_UPDATE_REQUEST } from './ducks';

const StyledContent = styled.div``;

const validationSchema = object().shape({
  username: string().required(),
  phoneNumber: string().required(),
  address: string().required(),
  email: string().required().email('Email is invalid'),
});

const Profile = ({ customer, dispatch }) => {
  const { username, phoneNumber, email, address } = customer;
  const [isModalOpen, setModalOpen] = useState(false);

  const initialValues = {
    username,
    phoneNumber,
    address,
    email,
  };

  const renderForm = ({ handleSubmit, ...form }) => (
    <Form className="form">
      <Field form={form} name="username" label="Username" component={Input} />
      <Field form={form} name="email" label="Email" component={Input} />
      <Field form={form} name="phoneNumber" label="Phone Number" component={Input} />
      <Field form={form} name="address" label="Address" component={Input} />
      <div>
        <Button htmlType="submit" onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </Form>
  );

  const onSubmit = values => {
    console.log(values);
    dispatch({
      type: CUSTOMER_UPDATE_REQUEST,
      payload: {
        ...values,
        callBack: success => {
          if (success) Notification.success('Update Profile Successfully!');
          else Notification.error('Update Profile Failed!');
          setModalOpen(false);
        },
      },
    });
  };

  return (
    <StyledContent>
      <Descriptions title="Profile">
        <Descriptions.Item label="UserName">{username}</Descriptions.Item>
        <Descriptions.Item label="Phone Number">{phoneNumber}</Descriptions.Item>
        <Descriptions.Item label="Email">{email}</Descriptions.Item>
        <Descriptions.Item label="Address">{address}</Descriptions.Item>
      </Descriptions>
      <Button onClick={() => setModalOpen(true)}>Edit</Button>
      <Modal title="Edit profile" visible={isModalOpen} onCancel={() => setModalOpen(false)}>
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          component={renderForm}
        />
      </Modal>
    </StyledContent>
  );
};

export default connect(state => ({ customer: state.customer.customer }))(Profile);
