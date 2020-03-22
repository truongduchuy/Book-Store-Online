import React from 'react'
import { Button } from 'antd'
import styled from 'styled-components'
import 'antd/es/button/style/css'

const StyledButton = styled(Button)`
  /* stylelint-disable */
`

export default ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
)
