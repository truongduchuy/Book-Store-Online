import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Table from 'antd-components/table';
import { GET_ORDERS_REQUEST } from './ducks';
import moment from 'moment';
import OrderDetails from './OrderDetails';
import Loading from '../Loading';

const StyledContent = styled.div``;

const columns = [
  {
    title: 'Order Id',
    dataIndex: '_id',
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
  },
];

const Orders = ({ orders, dispatch }) => {
  useEffect(() => {
    dispatch({ type: GET_ORDERS_REQUEST });
  }, [dispatch]);

  if (!orders) return <Loading />;

  return (
    <StyledContent>
      <h3 style={{ margin: '0 0 10px 0' }}>Orders</h3>
      <div className="table-box">
        <Table
          expandedRowRender={({ cart }) => (
            <OrderDetails books={cart.map(({ bookId, quantity }) => ({ ...bookId, quantity }))} />
          )}
          expandRowByClick
          bordered
          rowKey={({ _id }) => _id}
          dataSource={orders}
          columns={columns}
        />
      </div>
    </StyledContent>
  );
};

export default connect(state => ({
  orders: state.customer.orders,
  isWaitingOrders: state.customer.isWaitingOrders,
}))(Orders);
