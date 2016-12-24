import React, { PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import { withRouter } from 'react-router';
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
    this.closeSideMenu = this.closeSideMenu.bind(this);
    this.onRequestChangeMenu = this.onRequestChangeMenu.bind(this);
    this.onHeaderLeftIconTouchTap = this.onHeaderLeftIconTouchTap.bind(this);
  }

  componentDidMount() {
    this.initializeApiResource();
  }

  onRequestChangeMenu(open) {
    if (!open) {
      this.closeSideMenu();
    }
  }

  onHeaderLeftIconTouchTap(event) {
    event.preventDefault();
    this.openSideMenu();
  }

  openSideMenu() {
    this.setState({
      isSideMenuOpen: true
    });
  }

  closeSideMenu() {
    this.setState({
      isSideMenuOpen: false
    });
  }

  async initializeApiResource() {
    const apiResource = await ApiResource.initialize();
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      apiResource
    });
  }

  render() {
    const router = this.props.router;
    return (
      <div>
        <AppBar
          title="Tech Push"
          onLeftIconButtonTouchTap={this.onHeaderLeftIconTouchTap}
        />
        <Drawer
          open={this.state.isSideMenuOpen}
          docked={false}
          onRequestChange={this.onRequestChangeMenu}
        >
          <MenuItem
            onTouchTap={event => {
              event.preventDefault();
              this.closeSideMenu();
              router.push('/topics/edit');
            }}
          >
            トピックの設定
          </MenuItem>
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

export default withRouter(Layout);
