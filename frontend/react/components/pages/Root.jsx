import React, { Component } from 'react';

class Root extends Component {
  render() {
    return (
      <div>
        <div>{this.props.count}</div>
        <button onClick={() => this.props.dispatch('increment', 1)}>+1</button>
        <button onClick={() => this.props.dispatch('decrement', 1)}>-1</button>
        <button onClick={() => this.props.dispatch('increment', 100)}>+100</button>
      </div>
    );
  }
}

Root.propTypes = {
  count: React.PropTypes.number.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

export default Root;
