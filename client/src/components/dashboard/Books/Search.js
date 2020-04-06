import React from 'react'
import { Icon, Input } from 'antd'

const { Search } = Input

export default ({ isSearching, onSearch, setSearchOff, setSearchOn }) => (
  isSearching ?
    <Search
      placeholder="search"
      onSearch={onSearch}
      style={{ width: 200 }}
      onBlur={setSearchOff}
    /> :
    < Icon type="search" onClick={setSearchOn} />
)
