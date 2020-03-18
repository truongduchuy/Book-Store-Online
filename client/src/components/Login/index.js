import React, { useState, useEffect } from 'react';
import { USER_ADD_REQUEST, PREFERENCE_REQUEST } from '../../ducks';
import { connect } from 'react-redux';
import { createAction } from '../../dorothy/utils/redux';

const Login = ({ dispatch, users }) => {
  useEffect(() => {
    dispatch(createAction(PREFERENCE_REQUEST));
  }, [dispatch]);

  const [user, setUser] = useState({ email: '', password: '' });
  const { email, password } = user;

  const handleChange = (key, value) => {
    setUser({ ...user, [key]: value });
  };

  console.log(process.env.REACT_APP_NAME);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(createAction(USER_ADD_REQUEST, user));
  };

  return (
    <div>
      <h2>Test form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={event => handleChange('email', event.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={event => handleChange('password', event.target.value)}
        />
        <button type="submit">save</button>
        {users && <div>added {users.email}</div>}
      </form>
    </div>
  );
};

export default connect(state => ({
  users: state.preference.users,
  preference: state.preference.preference,
}))(Login);
