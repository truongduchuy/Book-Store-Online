import React from 'react';
import { object, string } from 'yup';
import styled from 'styled-components';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import Field from 'antd-components/field';
import Input from 'antd-components/input';
import Button from 'antd-components/button';

export const StyledForm = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.4);
  transform: translate(-50%, -50%);
  padding: 20px;
  width: 400px;

  .form {
    h2 {
      text-align: center;
    }

    > div:last-child {
      display: flex;
      justify-content: space-between;
    }
  }

  > a:last-child {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 0;
    right: 0;
    text-align: center;
    cursor: pointer;
    line-height: 30px;
    color: #009688;
    z-index: 10;
    font-size: 18px;

    i {
      color: black;
      font-size: 15px;
    }
  }

  @media screen and (max-width: 480px) {
    width: calc(100% - 30px);
  }
`;

const validationSchema = object().shape({
  email: string().required().email('Email is invalid'),
  password: string().required(),
});

const Login = () => {
  const initialValues = {
    email: '',
    password: '',
  };

  const renderForm = ({ handleSubmit, ...form }) => (
    <Form className="form">
      <h2>Please Login</h2>
      <Field form={form} name="email" label="Email" component={Input} />
      <Field form={form} name="password" label="Password" type="password" component={Input} />
      <div>
        <Button htmlType="submit" onClick={handleSubmit}>
          Login
        </Button>
        <Link to="/register">Register</Link>
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
