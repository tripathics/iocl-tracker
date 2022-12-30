import React, { useEffect, useState } from 'react';
import { checkAuth } from '../helpers/helpers';

const UnauthorizedComponent = () => (
  <div className='unauthorized-component'>
    <div className='container'>
      <h2>Unauthorized</h2>
    </div>
  </div>
);

const ProtectedComponent = ({ children, userState, handleUserState }) => {
  useEffect(() => {
    checkAuth().then(id => handleUserState(id))
    .catch(err => { throw err });
  })

  return userState ? children : <UnauthorizedComponent />
};

export default ProtectedComponent;