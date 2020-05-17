import React from 'react';
import { connect } from 'react-redux';
import { object, string } from 'yup';
import { Formik, Form } from 'formik';
import Field from 'antd-components/field';
import Input from 'antd-components/input';
import Modal from 'antd-components/modal';
import { UPDATE_SHIPPING_INFO } from '../Customer/ducks';
import Button from 'antd-components/button';

const validationSchema = object().shape({
  address: string().required(),
  phoneNumber: string().required(),
});

const ShippingInfo = ({ isOpen, dispatch, currentCustomer, onClose }) => {
  const { address, phoneNumber } = currentCustomer;

  const initialValues = {
    address,
    phoneNumber,
  };

  const renderForm = ({ handleSubmit, ...form }) => (
    <Form className="form">
      <Field form={form} name="address" label="Address" component={Input} />
      <Field form={form} name="phoneNumber" label="Phone number" component={Input} />
      <div>
        <Button htmlType="submit" onClick={handleSubmit}>
          Update
        </Button>
      </div>
    </Form>
  );

  const onSubmit = values => {
    console.log(values);
    dispatch({
      type: UPDATE_SHIPPING_INFO,
      payload: values,
    });
    onClose();
  };

  return (
    <Modal title="Shipping Information" visible={isOpen} onCancel={onClose}>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        component={renderForm}
      />
    </Modal>
  );
};

export default connect(state => ({ currentCustomer: state.customer.currentCustomer }))(
  ShippingInfo,
);
