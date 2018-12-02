import React from 'react';
import ScrollToTop from './ScrollToTop';
import { Switch, Route, Redirect } from 'react-router-dom';

import CrudClient from './../pages/customer/Crud';
import CrudRoom from './../pages/room/Crud';

export default () => {
  return <ScrollToTop>
    <Switch>
      <Route exact path={'/customers'} component={CrudClient} />
      <Route exact path={'/customers/:id/edit'} component={CrudClient} />
      <Route exact path={'/rooms/'} component={CrudRoom} />
      <Route exact path={'/rooms/:id/edit'} component={CrudRoom} />
      <Redirect to={{ pathname: '/rooms/' }} />
    </Switch>
  </ScrollToTop>
}
