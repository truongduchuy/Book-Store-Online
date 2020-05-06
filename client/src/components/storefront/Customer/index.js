import React from 'react';
import { connect } from 'react-redux';
import Layout from 'components/storefront/Layout';

const Customer = ({ isLogined }) => {
  if (!isLogined) return null;
  return (
    <Layout pages={['Home', 'Customer']}>
      <div>customer</div>
    </Layout>
  );
};

export default connect(state => ({ isLogined: state.customer.customer?._id }))(Customer);
