import React from 'react';
import { Icon, Spin } from 'antd';

export default () => <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />;
