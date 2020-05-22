import React from 'react';
import Header from './Header';

const withHeader = Component => {
  const WithHeader = props => {
    const employee = localStorage.getItem('bookstore-employee');
    if (!employee) props.history.push('/dashboard/login');
    return (
      <>
        <Header />
        <Component {...props} />
      </>
    );
  };

  return WithHeader;
};

export default withHeader;
