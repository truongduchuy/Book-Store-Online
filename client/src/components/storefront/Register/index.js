import React from 'react';
import { useDispatch } from 'react-redux';
import { object, string } from 'yup';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import Field from 'antd-components/field';
import Input from 'antd-components/input';
import Button from 'antd-components/button';
import Notification from 'antd-components/notification';
import { StyledForm } from '../Login';
import Layout from '../Layout';
import { REGISTATION_REQUEST } from '../Customer/ducks';

const validationSchema = object().shape({
  username: string().required(),
  phoneNumber: string().required(),
  address: string().required(),
  email: string().required().email('Email is invalid'),
  password: string().required().min(6),
  confirmPass: string().required().min(6),
});

const Register = ({ history }) => {
  const dispatch = useDispatch();
  console.log(dispatch);
  const initialValues = {
    username: '',
    phoneNumber: '',
    address: '',
    email: '',
    password: '',
    confirmPass: '',
  };

  const renderForm = ({ handleSubmit, ...form }) => (
    <Form className="form">
      <h2>Registation</h2>
      <Field form={form} name="username" label="Username" component={Input} />
      <Field form={form} name="email" label="Email" component={Input} />
      <Field form={form} name="password" label="Password" type="password" component={Input} />
      <Field
        form={form}
        name="confirmPass"
        label="Confirm Password"
        type="password"
        component={Input}
      />
      <Field form={form} name="phoneNumber" label="Phone Number" component={Input} />
      <Field form={form} name="address" label="Address" component={Input} />
      <div>
        <Button htmlType="submit" onClick={handleSubmit}>
          Register
        </Button>
        <Link to="/login">Login</Link>
      </div>
    </Form>
  );

  const handleRegister = values => {
    const { password, confirmPass } = values;
    if (password !== confirmPass) Notification.error('Confirm password is not exact!');
    else {
      dispatch({
        type: REGISTATION_REQUEST,
        payload: {
          history,
          ...values,
          callBack: success => {
            if (success) Notification.success('Registered Successfully!');
            else Notification.error('Registation Failed!');
          },
        },
      });
    }
  };

  return (
    <Layout pages={['Home', 'Register']}>
      <StyledForm>
        <div style={{ width: '500px' }}>
          <Formik
            validateOnChange={false}
            validateOnBlur={false}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
            component={renderForm}
          />
        </div>
      </StyledForm>
    </Layout>
  );
};

export default Register;
