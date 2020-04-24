import React from 'react';
import { Input } from 'antd';
import classNames from 'classnames';
import styled from 'styled-components';
import 'antd/es/input/style/css';

const StyledInput = styled(Input)`
  /* stylelint-disable */
`;

export default ({ field, form, modern, simple, value, className, ...props }) => {
  const handleChange = (e) => {
    field.onChange({ target: { value: e.target.value, name: field.name } });
  };

  return (
    <StyledInput
      {...props}
      value={field?.value || value}
      onChange={handleChange}
      className={classNames(className, { modern, simple })}
    />
  );
};

export const { Search } = Input;
