import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAuth } from '../helpers/helpers';

const UnauthorizedComponent = () => (
  <div className='unauthorized-component'>
    <h2>Unauthorized</h2>
  </div>
);

const ProtectedComponent = ({ children, userState, handleUserState }) => {
  const history = useNavigate();
  useEffect(() => {
    checkAuth().then(res => {
      handleUserState(res);
      if (!res.isAuth) return history('/login');
    })
    .catch(err => { throw err });
  })

  return userState ? children : <UnauthorizedComponent />
};

export default ProtectedComponent;