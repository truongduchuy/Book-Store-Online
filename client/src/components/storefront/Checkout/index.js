import React from 'react';
import { Progress } from 'antd';
import 'antd/es/progress/style/css';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #f1f1f1;

  > div {
    background: white;
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    padding: 120px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    > div:first-child {
      margin-bottom: 30px;
    }

    h3 {
      margin-bottom: 15px;
    }

    > div:nth-child(3) {
      margin-bottom: 30px;
    }

    button {
      padding: 10px 15px;
    }
  }
`;

const Checkout = () => {
  return (
    <Container>
      <div>
        <Progress
          type="circle"
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
          percent={100}
          width={150}
        />
        <h3>Payment successful!</h3>
        <div>Your payment infomation has been sent to your email</div>
        <Link to="/shop">Back to Shop</Link>
      </div>
    </Container>
  );
};

export default Checkout;
