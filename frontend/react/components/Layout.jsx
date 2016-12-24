import React, { PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import transitionStyle from '../../stylesheet/routerTransition.css';
import ApiResource from '../utils/ApiResource';

class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      apiResource: null,
      isSideMenuOpen: false
    };

    this.openSideMenu = this.openSideMenu.bind(this);
    // this.closeSideMenu = this.closeSideMenu.bind(this);
    this.onRequestChangeMenu = this.onRequestChangeMenu.bind(this);
  }

  componentDidMount() {
    this.initializeApiResource();
  }

  onRequestChangeMenu(open) {
    debugger;
    if (!open) {
      this.closeSideMenu();
    }
  }

  openSideMenu() {
    this.setState({
      isSideMenuOpen: true
    });
  }

  closeSideMenu() {
    this.setState({
      isSideMenuOpen: close
    });
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
        <AppBar
          title="Tech Push"
          onLeftIconButtonTouchTap={this.openSideMenu}
        />
        <Drawer
          open={this.state.isSideMenuOpen}
          onRequestChange={this.onRequestChangeMenu}
        >
          <MenuItem>トピックの設定</MenuItem>
        </Drawer>
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
