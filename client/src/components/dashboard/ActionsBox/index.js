import React from 'react';
import styled from 'styled-components';
import { Search } from 'antd-components/input';
import { Icon } from 'antd';
import Button from 'antd-components/button';

const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  > div:first-child {
    display: flex;
    align-items: center;

    h2 {
      margin-right: 20px;
    }
  }
`;

const ActionsBox = ({ title, buttonLabel, onClick, onSearch }) => {
  return (
    <Container>
      <div>
        <h2>{title}</h2>
        {onSearch && <Search placeholder="search" style={{ width: '250px' }} onSearch={onSearch} />}
      </div>
      {onClick && (
        <Button type="primary" ghost onClick={onClick}>
          <Icon type="plus" /> {buttonLabel}
        </Button>
      )}
    </Container>
  );
};

export default ActionsBox;
