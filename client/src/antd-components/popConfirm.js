import React from 'react';
import { Popconfirm } from 'antd';
import styled from 'styled-components';
import 'antd/es/popconfirm/style/css';

const StyledPopconfirm = styled(Popconfirm)`
  /* stylelint-disable */
`;

export default ({ children, ...props }) => (
  <StyledPopconfirm {...props}>{children}</StyledPopconfirm>
);
