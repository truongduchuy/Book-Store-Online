import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { UPDATE_EMPLOYEE } from '../Employees/ducks';

import Button from 'antd-components/button';

const HeaderContainer = styled.header`
  width: 100%;
  height: 60px;
  color: white;
  display: flex;
  background-color: #4141a9;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.2);
  z-index: 0;

  .content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left-box {
      display: flex;
      align-items: center;

      .menu-item {
        color: white;
        margin-right: 10px;
        padding: 10px 20px;
        transition: 0.2s;
        overflow: hidden;

        &:hover {
          opacity: 0.8;
        }

        &.active {
          transform: scale(1.4);
          font-weight: bold;
        }
      }
    }

    .right-box {
      display: flex;
      align-items: center;

      .user-box {
        align-items: center;
        display: flex;
        margin-right: 20px;

        > i {
          font-size: 20px;
          margin-right: 10px;
        }
      }
    }
  }
`;

const Header = ({ role, name }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = () => {
    history.push('/dashboard/login');
    dispatch({ type: UPDATE_EMPLOYEE, payload: null });
  };

  const links =
    role !== 'ADMIN'
      ? [
          {
            url: '/dashboard/orders',
            label: 'Orders',
          },
        ]
      : [
          {
            url: '/dashboard/orders',
            label: 'Orders',
          },
          {
            url: '/dashboard/books',
            label: 'Books',
          },
          {
            url: '/dashboard/genres',
            label: 'Genres',
          },
          {
            url: '/dashboard/employees',
            label: 'Employees',
          },
          {
            url: '/dashboard/statistics',
            label: 'Statistics',
          },
        ];

  return (
    <HeaderContainer>
      <div className="content">
        <div className="left-box">
          {links.map((item, index) => (
            <NavLink
              key={index.toString()}
              exact={item.url === '/'}
              className="menu-item"
              to={item.url}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="right-box">
          <div className="user-box">
            <Icon type="user" />
            <span>{name}</span>
          </div>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </div>
    </HeaderContainer>
  );
};

export default connect(({ employee }) => ({
  role: employee.employee?.role,
  name: employee.employee?.name,
}))(Header);
