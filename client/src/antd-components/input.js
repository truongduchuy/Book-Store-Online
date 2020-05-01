import React from 'react';
import { Input } from 'antd';
import classNames from 'classnames';
import styled from 'styled-components';
import 'antd/es/input/style/css';

const { TextArea } = Input;

const StyledInput = styled(Input)`
  /* stylelint-disable */
`;

export default ({ field, form, modern, simple, value, className, ...props }) => {
  const handleChange = value => {
    field.onChange({ target: { value, name: field.name } });
  };

  return (
    <StyledInput
      {...props}
      value={field?.value || value}
      onChange={e => handleChange(e.target.value)}
      className={classNames(className, { modern, simple })}
    />
  );
};

export const { Search } = Input;

const StyledTextArea = styled(TextArea)`
  /* stylelint-disable */
`;

export const TextAreaInput = ({ field, form, modern, simple, value, className, ...props }) => {
  const handleChange = value => {
    field.onChange({ target: { value, name: field.name } });
  };

  return (
    <StyledTextArea
      {...props}
      value={field?.value || value}
      onChange={e => handleChange(e.target.value)}
      className={classNames(className, { modern, simple })}
    />
  );
};
