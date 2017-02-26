import React, { Component } from 'react';
import { withRouter } from 'react-router';

export function injectGlobalState(WrappedComponent, globalState) {
  return class extends Component {
    render() {
      return <WrappedComponent {...globalState} {...this.props} />;
    }
  };
}

export function injectBaseFunction(WrappedComponent, globalState) {
  const InjectedComponent = withRouter(WrappedComponent);
  return injectGlobalState(InjectedComponent, globalState);
}

export function forceLogin(WrappedComponent, globalState) {
  const InjectedComponent = class extends Component {
    render() {
      if (!this.props.apiResource.authorized) {
        this.props.router.push('/login');
      }

      // ローカルコンポーネントで対象のコンポーネントのReact elementを返す
      return (
        <WrappedComponent
          {...this.props}
        />
      );
    }
  };

  return injectBaseFunction(InjectedComponent, globalState);
}
