import React from 'react'
import { DatePicker } from 'antd'
import classNames from 'classnames'
import styled from 'styled-components'
import 'antd/es/date-picker/style/css'

const StyledDatePicker = styled(DatePicker)`

`

export default ({ field, form, className, ...props }) => (
  <StyledDatePicker
    {...field}
    {...props}
    className={classNames(className)}
  />
)
