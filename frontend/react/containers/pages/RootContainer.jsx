import React from 'react';
import MicroContainer from 'react-micro-container';
import Root from '../../components/pages/Root';

export default class RootContainer extends MicroContainer {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      testString: null
    };
  }

  componentDidMount() {
    this.subscribe({
      increment: this.handleIncrement,
      decrement: this.handleDecrement
    });
  }

  handleIncrement(count) {
    this.setState({ count: this.state.count + count });
  }

  handleDecrement(count) {
    this.setState({ count: this.state.count - count });
  }

  render() {
    return <Root dispatch={this.dispatch} {...this.state} />;
  }
}
