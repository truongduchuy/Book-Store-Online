import React from 'react';
import { object, string } from 'yup';
import { Formik, Form } from 'formik';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import Field from 'antd-components/field';
import Input from 'antd-components/input';
import Button from 'antd-components/button';
import { StyledForm } from '../Login';

const validationSchema = object().shape({
  username: string().required(),
  phoneNumber: string().required('Phone mumber is a required field'),
  address: string().required(),
  email: string().required().email('Email is invalid'),
  password: string().required(),
});

const Login = () => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const renderForm = ({ handleSubmit, ...form }) => (
    <Form className="form">
      <h2>Registation</h2>
      <Field form={form} name="username" label="Username" component={Input} />
      <Field form={form} name="email" label="Email" component={Input} />
      <Field form={form} name="password" label="Password" type="password" component={Input} />
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

  const onLogin = values => {
    console.log(values);
  };

  return (
    <StyledForm style={{ width: '500px' }}>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onLogin}
        component={renderForm}
      />
      <Link to="/">
        <Icon type="close" />
      </Link>
    </StyledForm>
  );
};

export default Login;
