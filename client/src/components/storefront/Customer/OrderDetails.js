import React from 'react';
import Table from 'antd-components/table';

const OrderDetails = ({ books }) => {
  console.log(books);
  const columns = [
    // {
    //   title: '#',
    //   render: (text, record, index) => <span>{index + 1}</span>,
    //   width: 50,
    // },
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
      <Table bordered rowKey={({ _id }) => _id} dataSource={books} columns={columns} size="small" />
    </div>
  );
};

export default OrderDetails;
