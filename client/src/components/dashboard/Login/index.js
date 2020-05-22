import React from 'react';
import { useDispatch } from 'react-redux';
import { object, string } from 'yup';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import Field from 'antd-components/field';
import Input from 'antd-components/input';
import Button from 'antd-components/button';
import { LOGIN_DASHBOARD_REQUEST } from '../Employees/ducks';
import Notification from 'antd-components/notification';

const Container = styled.div`
  background-color: #eee;
  width: 100vw;
  height: 100vh;
  position: relative;
`;

export const StyledForm = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  > div {
    width: 350px;
    padding: 30px 20px 40px 20px;
    background: white;

    .form {
      > *:not(:last-child) {
        margin-bottom: 15px;
      }

      h2 {
        text-align: center;
      }

      > div:last-child {
        display: flex;
        justify-content: space-between;

        button {
          text-transform: uppercase;
          font-weight: 500;
        }
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
        <Button htmlType="submit" type="primary" block onClick={handleSubmit}>
          Login
        </Button>
      </div>
    </Form>
  );

  const onLogin = values => {
    console.log(values);
    dispatch({
      type: LOGIN_DASHBOARD_REQUEST,
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
    <Container>
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
    </Container>
  );
};

export default Login;
