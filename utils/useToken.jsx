import { useState, useEffect } from 'react';

function useToken(friendID) {
  const [token, setToken] = useState(null);



  return {
    token,
    authenticated
  };
}