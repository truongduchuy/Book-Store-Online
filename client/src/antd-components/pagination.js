import React from 'react';
import styled from 'styled-components';
import { Pagination } from 'antd';
import 'antd/es/pagination/style/css';

const Content = styled.div`
  height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;
`;

export default (props) => (
  <Content>
    <Pagination {...props} />
  </Content>
);
