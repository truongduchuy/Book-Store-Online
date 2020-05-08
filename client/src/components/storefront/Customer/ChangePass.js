import React from 'react';
import { useDispatch } from 'react-redux';
import { object, string } from 'yup';
import { Formik, Form } from 'formik';
import Field from 'antd-components/field';
import Input from 'antd-components/input';
import Modal from 'antd-components/modal';
import { CUSTOMER_CHANGE_PASSWORD_REQUEST } from './ducks';
import Notification from 'antd-components/notification';
import Button from 'antd-components/button';

const validationSchema = object().shape({
  password: string().required().min(6),
  newPassword: string().required().min(6),
  confirmPass: string().required().min(6),
});

const ChangePass = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const initialValues = {
    password: '',
    newPassword: '',
    confirmPass: '',
  };

  const renderForm = ({ handleSubmit, ...form }) => (
    <Form className="form">
      <Field form={form} name="password" label="Password" type="password" component={Input} />
      <Field
        form={form}
        name="newPassword"
        label="New Password"
        type="password"
        component={Input}
      />
      <Field
        form={form}
        name="confirmPass"
        label="Confirm New Password"
        type="password"
        component={Input}
      />
      <div>
        <Button htmlType="submit" onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </Form>
  );

  const onSubmit = values => {
    console.log(values);
    const { password, newPassword, confirmPass } = values;
    if (newPassword !== confirmPass) Notification.error('Confirm Password is not match!');
    else
      dispatch({
        type: CUSTOMER_CHANGE_PASSWORD_REQUEST,
        payload: {
          password,
          newPassword,
          callBack: success => {
            if (success) Notification.success('Password Changed Successfully!');
            else Notification.error('Password is incorrect!');
            onClose();
          },
        },
      });
  };

  return (
    <div>
      <Modal title="Change Password" visible={isOpen} onCancel={onClose}>
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          component={renderForm}
        />
      </Modal>
    </div>
  );
};

export default ChangePass;
