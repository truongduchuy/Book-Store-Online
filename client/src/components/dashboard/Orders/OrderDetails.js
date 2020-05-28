import React from 'react';
import Table from 'antd-components/table';
import { Descriptions } from 'antd';
import 'antd/es/descriptions/style/css';

const OrderDetails = ({ order }) => {
  const { cart, customer } = order;
  const { username, phoneNumber, email, address } = customer;

  const columns = [
    {
      title: '',
      dataIndex: 'imageUrl',
      render: (data, record) => (
        <a href={`/shop/${record.title}`} target="_blank" rel="noopener noreferrer">
          <img style={{ width: '100px' }} src={data} alt="book" />
        </a>
      ),
      width: '105px',
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: text => <span>${text}</span>,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Amount Paid',
      render: (text, record) => <span>${record.price * record.quantity}</span>,
    },
  ];

  return (
    <div>
      <Descriptions title="Customer Info">
        <Descriptions.Item label="UserName">{username}</Descriptions.Item>
        <Descriptions.Item label="Phone Number">{phoneNumber}</Descriptions.Item>
        <Descriptions.Item label="Email">{email}</Descriptions.Item>
        <Descriptions.Item label="Address">{address}</Descriptions.Item>
      </Descriptions>
      <Table
        bordered
        rowKey={({ _id }) => _id}
        dataSource={cart.map(({ bookId, quantity }) => ({ ...bookId, quantity }))}
        columns={columns}
        size="small"
      />
    </div>
  );
};

export default OrderDetails;
