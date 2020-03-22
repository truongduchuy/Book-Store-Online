import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
  width: 100%;
`

export default ({ children, ...props }) => (
  <Div {...props}>{ children }</Div>
)
