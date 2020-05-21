import React from 'react';
import { Table } from 'antd';
import styled from 'styled-components';
import 'antd/es/table/style/css';

const StyledTable = styled(Table)`
  border-bottom: 1px solid #e8e8e8;
  border-top: 1px solid #e8e8e8;
`;

export default props => <StyledTable {...props} pagination={false} />;
