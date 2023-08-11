import {useContext} from 'react';
import {Navigate} from 'react-router-dom';

import {AuthContext} from '../contexts/AuthContext';

import Spinner from './Spinner';


const ProtectedRoute = ({element: Component, isLoading, ...props}) => {
  const {isLoggedIn} = useContext(AuthContext);
  
  if (isLoading) {
    return (
      <Spinner theme="dark" size="big"/>
    )
  }
  
  return (
    isLoggedIn ? <Component {...props}/> : <Navigate to="sign-in" replace={true}/>
  );
};

export default ProtectedRoute;