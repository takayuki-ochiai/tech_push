import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import { withRouter } from 'react-router';
import transitionStyle from '../../stylesheet/routerTransition.css';


class Layout extends Component {
  constructor() {
    super();
    this.state = {
      isSideMenuOpen: false
    };
    this.openSideMenu = this.openSideMenu.bind(this);
    this.closeSideMenu = this.closeSideMenu.bind(this);
    this.onRequestChangeSideMenu = this.onRequestChangeSideMenu.bind(this);
    this.onHeaderLeftIconTouchTap = this.onHeaderLeftIconTouchTap.bind(this);
  }

  onRequestChangeSideMenu(open) {
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
          onRequestChange={this.onRequestChangeSideMenu}
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
          {this.props.children}
        </div>
      </div>
    );
  }

}

export default withRouter(Layout);
