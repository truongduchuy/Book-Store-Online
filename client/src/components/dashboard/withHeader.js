import React from 'react';
import Header from './Header';

const withHeader = Component => {
  const WithHeader = props => {
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
