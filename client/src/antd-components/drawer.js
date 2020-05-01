import React from 'react';
import { Drawer } from 'antd';
import styled from 'styled-components';
import 'antd/es/drawer/style/css';

const StyledDrawer = styled(Drawer)`
  /* stylelint-disable */
`;

export default ({ children, ...props }) => <StyledDrawer {...props}>{children}</StyledDrawer>;
