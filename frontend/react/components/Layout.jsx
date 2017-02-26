import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import transitionStyle from '../../stylesheet/routerTransition.css';

const NO_ANIMATION = 'noAnimation';
const SLIDE_LEFT = 'slideLeft';
const SLIDE_RIGHT = 'slideRight';

const hiddenMenu = {
  display: 'none'
};

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

  renderTitle() {
    const pathname = this.props.location.pathname;
    switch (true) {
      case /\/topics\/edit/.test(pathname):
        return 'トピック選択';
      default:
        return 'Tech Push';
    }
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
    const transition = this.props.location.query.transition || NO_ANIMATION;
    const authorized = this.props.apiResource.authorized;
    const transitionEnterTimeout = transition === NO_ANIMATION ? 1 : 300;
    const transitionLeaveTimeout = transition === NO_ANIMATION ? 1 : 300;
    const childElement = <div className="content">{this.props.children}</div>;
    return (
      <div>
        <AppBar
          title={this.renderTitle()}
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
              router.push({
                pathname: '/',
                // query: { transition: SLIDE_LEFT }
              });
            }}
          >
            新刊書籍
          </MenuItem>
          <MenuItem
            style={authorized ? {} : hiddenMenu}
            onTouchTap={event => {
              event.preventDefault();
              this.closeSideMenu();
              router.push({
                pathname: '/notices',
                // query: { transition: SLIDE_LEFT }
              });
            }}
          >
            通知一覧
          </MenuItem>
          <MenuItem
            style={authorized ? {} : hiddenMenu}
            onTouchTap={event => {
              event.preventDefault();
              this.closeSideMenu();
              router.push({
                pathname: '/topics/edit',
                // query: { transition: SLIDE_LEFT }
              });
            }}
          >
            トピックの設定
          </MenuItem>
          <MenuItem
            onTouchTap={event => {
              event.preventDefault();
              this.closeSideMenu();
              router.push({
                pathname: '/login',
                // query: { transition: SLIDE_LEFT }
              });
            }}
          >
            ログイン
          </MenuItem>
        </Drawer>
        <div className="wrapper">
          <ReactCSSTransitionGroup
            transitionName={transition}
            transitionEnterTimeout={transitionEnterTimeout}
            transitionLeaveTimeout={transitionLeaveTimeout}
          >
            {
              React.cloneElement(
                childElement,
                { key: this.props.location.pathname }
              )
            }
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }

}

export default Layout;
