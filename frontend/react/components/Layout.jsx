import React, { PropTypes } from 'react';

import { RouteTransition } from 'react-router-transition';
import transitionStyle from '../../stylesheet/routerTransition.css';

function Layout({ location, routerTransition, children }) {
  return (
    <div>
      <RouteTransition
        component={false}
        className={transitionStyle.wrapper}
        pathname={location.pathname}
        {...routerTransition}
      >
        <div className={transitionStyle.content}>
          {children}
        </div>
      </RouteTransition>
    </div>
  );
}


Layout.propTypes = {
  location: PropTypes.object.isRequired,
  routerTransition: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default Layout;
