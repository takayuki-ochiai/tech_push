import React, { PropTypes } from 'react';
import transitionStyle from '../../stylesheet/routerTransition.css';
import ApiResource from '../utils/ApiResource';

class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      apiResource: null
    };
  }

  componentDidMount() {
    this.initializeApiResource();
  }

  async initializeApiResource() {
    const apiResource = await ApiResource.initialize();
    console.log('after initialize');
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      apiResource
    });
  }

  render() {
    return (
      <div>
        <div className={transitionStyle.content}>
          {React.cloneElement(this.props.children, { apiResource: this.state.apiResource })}
        </div>
      </div>
    );
  }

}


Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
