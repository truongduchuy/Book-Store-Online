import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  border: none;
  background-color: #006eff;
  color: white;
  cursor: pointer;
  font-size: 0.8125em;
  font-weight: 700;
  letter-spacing: 0.15em;
  ${({ lowercase }) =>
    !lowercase &&
    `
  text-transform: uppercase;
  `}
  padding: 15px 45px;
  padding: ${({ padding }) => padding};

  &:hover {
    background-color: #0058cc;
  }
`;

export default ({ label, padding, lowercase, children, ...restProps }) => (
  <StyledButton {...restProps} lowercase={lowercase} padding={padding}>
    {children || label}
  </StyledButton>
);
