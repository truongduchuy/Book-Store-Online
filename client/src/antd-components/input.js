import React, { useState } from 'react';
import { Input } from 'antd';
import classNames from 'classnames';
import styled from 'styled-components';
import 'antd/es/input/style/css';

const StyledInput = styled(Input)`
  /* stylelint-disable */
`;

export default ({ field, form, modern, simple, value, className, ...props }) => {
  const [input, setInput] = useState(null);

  const handleChange = e => {
    field.onChange({ target: { value: e.target.value, name: field.name } });
    setInput(e.target.value);
  };

  return (
    <StyledInput
      {...props}
      value={input || value}
      onChange={handleChange}
      className={classNames(className, { modern, simple })}
    />
  );
};

export const { Search } = Input;
