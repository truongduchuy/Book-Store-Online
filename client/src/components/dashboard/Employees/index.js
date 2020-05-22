import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { object, string } from 'yup';
import { connect } from 'react-redux';

import Table from 'antd-components/table';
import Button from 'antd-components/button';
import Field from 'antd-components/field';
import Input from 'antd-components/input';
import Popconfirm from 'antd-components/popConfirm';
import Modal from 'antd-components/modal';
import { createAction } from 'dorothy/utils/index';
import withHeader from '../withHeader';
import ActionsBox from '../ActionsBox';
import {
  EMPLOYEES_REQUEST,
  EMPLOYEE_ADD_REQUEST,
  EMPLOYEE_DELETE_REQUEST,
  EMPLOYEE_UPDATE_REQUEST,
  SEARCH_EMPLOYEE_CHANGE,
} from './ducks';
import Notification from 'antd-components/notification';

const Container = styled.div`
  padding: 50px 100px;

  .table-box {
    margin-top: 30px;
  }
`;

const StyledForm = styled.div`
  .action-box {
    display: flex;
    justify-content: flex-end;

    > button:nth-child(2) {
      margin-left: 20px;
    }
  }

  .field-group > div {
    margin-bottom: 30px;
  }
`;

const validationSchema = object().shape({
  email: string().required().email(),
  name: string().required(),
});

const Employees = ({ employeeStore, dispatch }) => {
  const [modalData, setModalData] = useState({ isOpen: false, editingId: '' });

  const { isOpen, editingId } = modalData;

  const { employees, isWaitingEmployees } = employeeStore;

  useEffect(() => {
    dispatch(createAction(EMPLOYEES_REQUEST));
  }, [dispatch]);

  const handleCloseModal = () => {
    setModalData({ isOpen: false, editingId: '' });
  };

  const onSubmit = values => {
    console.log(values);
    if (editingId !== '') {
      dispatch(
        createAction(EMPLOYEE_UPDATE_REQUEST, {
          ...values,
          callBack: success => {
            if (success) Notification.success('Employee updated successfully!');
            else Notification.error('Update Employee failed!');
            setModalData({ isOpen: false, editingId: '' });
          },
        }),
      );
    } else {
      dispatch(
        createAction(EMPLOYEE_ADD_REQUEST, {
          ...values,
          callBack: success => {
            if (success) Notification.success('Employee added successfully!');
            else Notification.error('Add Employee failed!');
            setModalData({ isOpen: false, editingId: '' });
          },
        }),
      );
    }
  };

  const renderForm = ({ handleSubmit, ...form }) => (
    <Form className="form">
      <div className="field-group">
        <Field
          form={form}
          inline
          name="email"
          label="Email"
          disabled={editingId}
          component={Input}
        />
        <Field form={form} inline name="name" label="Name" component={Input} />
        <Field
          form={form}
          inline
          name="password"
          placeholder={editingId ? `leave it empty if you don't want to update` : null}
          label="Password"
          type="password"
          component={Input}
        />
        {!editingId && (
          <Field
            form={form}
            inline
            name="confirmPass"
            label="Confirm Password"
            type="password"
            component={Input}
          />
        )}
      </div>
      <div className="action-box">
        <Button size="large" htmlType="submit" type="primary" onClick={handleSubmit}>
          Save
        </Button>
        <Button size="large" onClick={handleCloseModal}>
          Cancel
        </Button>
      </div>
    </Form>
  );

  const editingEmployee = employees.find(({ _id }) => _id === editingId) || {};
  const { email, name, _id } = editingEmployee;
  const initialValues = {
    _id,
    email: email || '',
    name: name || '',
    password: '',
    confirmPass: '',
  };

  const columns = [
    {
      title: '#',
      key: '_id',
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Operation',
      render: (name, record) =>
        record.role !== 'ADMIN' && (
          <>
            <Button
              onClick={() => setModalData({ ...modalData, editingId: record._id })}
              type="link"
            >
              Edit
            </Button>
            <Popconfirm
              placement="topRight"
              title="Are you sure to delete?"
              onConfirm={() => dispatch(createAction(EMPLOYEE_DELETE_REQUEST, record._id))}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link">Delete</Button>
            </Popconfirm>
          </>
        ),
    },
  ];

  return (
    <Container>
      {(isOpen || editingId !== '') && (
        <Modal
          title={editingId ? 'Update Employee' : 'New Employee'}
          visible={isOpen || editingId !== ''}
          onCancel={handleCloseModal}
        >
          <StyledForm>
            <Formik
              validateOnChange={false}
              validateOnBlur={false}
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              component={renderForm}
            />
          </StyledForm>
        </Modal>
      )}
      <ActionsBox
        title="Employees"
        buttonLabel="New Employee"
        onSearch={value => dispatch(createAction(SEARCH_EMPLOYEE_CHANGE, value))}
        onClick={() => setModalData({ isOpen: true, editingId: '' })}
      />
      <div className="table-box">
        <Table
          bordered
          rowKey={(row, index) => index}
          dataSource={employees}
          columns={columns}
          loading={isWaitingEmployees}
        />
      </div>
    </Container>
  );
};

export default connect(({ employee }) => ({
  employeeStore: employee,
}))(withHeader(Employees));
