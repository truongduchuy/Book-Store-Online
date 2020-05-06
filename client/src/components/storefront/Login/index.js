import React from 'react';
import { useDispatch } from 'react-redux';
import { object, string } from 'yup';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import Layout from '../Layout';
import Field from 'antd-components/field';
import Input from 'antd-components/input';
import Button from 'antd-components/button';
import { LOGIN_REQUEST } from '../Customer/ducks';
import Notification from 'antd-components/notification';

export const StyledForm = styled.div`
  padding: 70px 0;
  display: flex;
  justify-content: center;

  > div {
    width: 400px;
    padding: 20px;
    box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.4);

    .form {
      h2 {
        text-align: center;
      }

      > div:last-child {
        display: flex;
        justify-content: space-between;
      }
    }

    @media screen and (max-width: 480px) {
      width: calc(100% - 30px);
      max-width: calc(100% - 30px);
    }
  }
`;

const validationSchema = object().shape({
  email: string().required().email('Email is invalid'),
  password: string().required().min(6),
});

const Login = ({ history }) => {
  const dispatch = useDispatch();
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
    dispatch({
      type: LOGIN_REQUEST,
      payload: {
        ...values,
        history,
        callBack: success => {
          if (success) Notification.success('Logined successfully!');
          else Notification.error('Email or password is incorrect!');
        },
      },
    });
  };

  return (
    <Layout pages={['Home', 'Login']}>
      <StyledForm>
        <div>
          <Formik
            validateOnChange={false}
            validateOnBlur={false}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onLogin}
            component={renderForm}
          />
        </div>
      </StyledForm>
    </Layout>
  );
};

export default Login;
