import React from 'react';
import { Route } from 'react-router';
import HomeContainer from '../../containers/HomeContainer';

const createRoutes = (store) => {
  return (
    <Route path="/" component={HomeContainer}/>
  );
};

export default createRoutes
