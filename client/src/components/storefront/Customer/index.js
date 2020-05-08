import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';
import 'antd/es/card/style/css';
import styled from 'styled-components';
import Layout from 'components/storefront/Layout';
import Profile from './profile';
import ChangePass from './ChangePass';

const StyledContent = styled.section`
  padding: 70px 70px;
  display: flex;

  .left-box {
    margin-right: 100px;

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

        &:hover {
          border: 1px solid #42a5f5;
        }
      }
    }
  }
`;

const Customer = ({ customer }) => {
  const [isChangePass, setChangePass] = useState(false);
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
            <div onClick={() => console.log('filter undone reports')}>
              <span>Profile</span>
            </div>
            <div onClick={() => console.log('filter done reports')}>
              <span>Orders</span>
            </div>
            <div onClick={() => setChangePass(true)}>
              <span>Change Password</span>
            </div>
          </Card>
        </div>
        <div className="right-box">
          {isChangePass && (
            <ChangePass isOpen={isChangePass} onClose={() => setChangePass(false)} />
          )}
          <Profile />
        </div>
      </StyledContent>
    </Layout>
  );
};

export default connect(state => ({ customer: state.customer.customer }))(Customer);
