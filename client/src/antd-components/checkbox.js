import React from 'react';
import { Checkbox } from 'antd';
import styled from 'styled-components';
import 'antd/es/checkbox/style/css';

const StyledCheckbox = styled(Checkbox)`
  /* stylelint-disable */
`;

export default ({ children, field, form, ...props }) => (
  <StyledCheckbox {...props} {...field} checked={(field && field.value) || props.checked}>
    {children}
  </StyledCheckbox>
);
