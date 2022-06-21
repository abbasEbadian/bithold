import React from 'react';

const UserContext = React.createContext({
    user: {},
    setStatus : () => {},
})                
export default UserContext;
  