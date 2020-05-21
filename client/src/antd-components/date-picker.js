import React from 'react';
import { DatePicker } from 'antd';
import classNames from 'classnames';
import styled from 'styled-components';
import moment from 'moment';
import 'antd/es/date-picker/style/css';
import lodash from 'lodash';

export const { RangePicker } = DatePicker;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
`;
export const dateFormat = 'DD/MM/YYYY';

export default ({ field, form, className, ...props }) => {
  const handleChange = (date, dateString) => {
    if (!lodash.isEmpty(field))
      field.onChange({ target: { value: moment(dateString, dateFormat), name: field.name } });
  };

  return (
    <StyledDatePicker
      value={field && field.value}
      {...props}
      onChange={handleChange}
      className={classNames(className)}
    />
  );
};
