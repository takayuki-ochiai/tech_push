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
    this.props.apiResource.post('/api/v1/test', {
      hogeHoge: "hogehoge",
      testTest: {
        hageHage: "hageHage"
      },
      test: [
        {
          hogeHoge: "hogeHoge",
          hageHage: "hageHage"
        },
        {
          hogeHoge: "hogeHoge",
          hageHage: "hageHage"
        }
      ]
    });
    this.setState({ count: this.state.count + count });
  }

  handleDecrement(count) {
    this.setState({ count: this.state.count - count });
  }

  render() {
    return <Root dispatch={this.dispatch} {...this.state} />;
  }
}
