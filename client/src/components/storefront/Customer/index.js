import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';
import 'antd/es/card/style/css';
import styled from 'styled-components';
import Layout from 'components/storefront/Layout';
import Profile from './profile';
import ChangePass from './ChangePass';
import Orders from './Orders';

const StyledContent = styled.section`
  padding: 70px 70px;
  display: flex;

  .left-box {
    margin-right: 50px;

    > .ant-card {
      border: 1px solid #42a5f5;

      .ant-card-head {
        padding: 7px 12px;
      }

      .ant-card-body > div {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        cursor: pointer;
        border: 1px solid #eee;

        &.active {
          color: #42a5f5;
          border: 1px solid #42a5f5;
        }

        &:hover {
          border: 1px solid #42a5f5;
        }
      }
    }
  }

  .right-box {
    width: 100%;
  }
`;

const Customer = ({ customer, isWaitingOrders }) => {
  const [isChangePass, setChangePass] = useState(false);
  const [isShowOrders, setShowOrders] = useState(false);

  const { username } = customer;

  if (!username) return null;

  return (
    <Layout pages={['Home', 'Customer']}>
      <StyledContent>
        <div className="left-box">
          <Card
            size="small"
            title={username}
            style={{ width: 250 }}
            bodyStyle={{ padding: 0, height: '300px' }}
            headStyle={{ backgroundColor: '#42a5f5', color: 'white' }}
          >
            <div className={!isShowOrders ? 'active' : null} onClick={() => setShowOrders(false)}>
              <span>Profile</span>
            </div>
            <div className={isShowOrders ? 'active' : null} onClick={() => setShowOrders(true)}>
              <span>Orders</span>
            </div>
            <div className={isChangePass ? 'active' : null} onClick={() => setChangePass(true)}>
              <span>Change Password</span>
            </div>
          </Card>
        </div>
        <div className="right-box">
          {isChangePass && (
            <ChangePass isOpen={isChangePass} onClose={() => setChangePass(false)} />
          )}
          {isShowOrders ? <Orders /> : <Profile />}
        </div>
      </StyledContent>
    </Layout>
  );
};

export default connect(state => ({
  customer: state.customer.customer,
}))(Customer);
