import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';
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
    this.onMenuLeftIconTouchTap = this.onMenuLeftIconTouchTap.bind(this);
    this.onArrowBackIconTouchTap = this.onArrowBackIconTouchTap.bind(this);
  }

  onRequestChangeSideMenu(open) {
    if (!open) {
      this.closeSideMenu();
    }
  }

  onMenuLeftIconTouchTap(event) {
    event.preventDefault();
    this.openSideMenu();
  }

  onArrowBackIconTouchTap(event) {
    event.preventDefault();
    this.props.router.goBack();
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

  renderLeftIcon() {
    const pathname = this.props.location.pathname;
    switch (true) {
      case /\/topics\/edit\/(\d+)/.test(pathname):
        return (
          <IconButton
            onTouchTap={this.onArrowBackIconTouchTap}
          >
            <ArrowBackIcon />
          </IconButton>
        );
      default:
        return (
          <IconButton
            onTouchTap={this.onMenuLeftIconTouchTap}
          >
            <MenuIcon />
          </IconButton>
        );
    }
  }

  render() {
    const router = this.props.router;
    return (
      <div>
        <AppBar
          title="Tech Push"
          // onLeftIconButtonTouchTap={this.onHeaderLeftIconTouchTap}
          iconElementLeft={this.renderLeftIcon()}
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
