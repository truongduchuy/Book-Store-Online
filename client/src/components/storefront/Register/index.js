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
  name: string().required(),
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
      <Field form={form} name="name" label="User name" component={Input} />
      <Field form={form} name="email" label="Email" component={Input} />
      <Field form={form} name="password" label="Password" type="password" component={Input} />
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
    <StyledForm>
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
