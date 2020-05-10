import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import withHeader from '../withHeader';
import styled from 'styled-components';
import ActionsBox from '../ActionsBox';
import moment from 'moment';
import Table from 'antd-components/table';
import { ORDERS_REQUEST } from './ducks';
import PaginationBox from 'antd-components/pagination';
import OrderDetails from './OrderDetails';
import { Select } from 'antd';
import 'antd/es/select/style/css';
import { ORDER_UPDATE_STATUS_REQUEST } from './ducks';

const pageSize = 5;
const { Option } = Select;

const Container = styled.div`
  padding: 50px 100px;

  .table-box {
    margin-top: 30px;
  }
`;

const Orders = ({ orderStore, dispatch }) => {
  const { orders, total, isWaitingOrders } = orderStore;

  useEffect(() => {
    dispatch({ type: ORDERS_REQUEST, payload: { size: pageSize, page: 1 } });
  }, [dispatch]);

  const columns = [
    {
      title: 'Customer',
      dataIndex: 'customer',
      render: customer => <span>{customer.username}</span>,
    },
    {
      title: 'Order On',
      dataIndex: 'createdAt',
      render: data => <span>{moment(data).format('YYYY/MM/DD - HH:mm')}</span>,
    },
    {
      title: 'Order Total',
      dataIndex: 'orderTotal',
      render: data => <span>${data}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status, record) => (
        <Select
          value={status}
          style={{ width: 120 }}
          onChange={value =>
            dispatch({
              type: ORDER_UPDATE_STATUS_REQUEST,
              payload: { status: value, id: record._id, previousStatus: status },
            })
          }
        >
          <Option value="Progressing">Progressing</Option>
          <Option value="Delivering">Delivering</Option>
          <Option value="Delivered">Delivered</Option>
        </Select>
      ),
    },
  ];

  return (
    <Container>
      <ActionsBox title="Orders" />
      <div className="table-box">
        <Table
          expandedRowRender={record => <OrderDetails order={record} />}
          bordered
          rowKey={({ _id }) => _id}
          dataSource={orders}
          columns={columns}
          loading={isWaitingOrders}
        />
      </div>
      <PaginationBox
        pageSize={pageSize}
        total={total}
        onChange={page => {
          dispatch({ type: ORDERS_REQUEST, payload: { page, size: pageSize } });
        }}
      />
    </Container>
  );
};

export default connect(state => ({ orderStore: state.order }))(withHeader(Orders));
