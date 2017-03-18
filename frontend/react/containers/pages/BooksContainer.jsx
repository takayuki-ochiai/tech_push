import React from 'react';
import MicroContainer from 'react-micro-container';
import Books from '../../components/pages/Books';
import BooksStore from '../../stores/Books';

export default class BooksContainer extends MicroContainer {
  constructor(props) {
    super(props);
    this.state = {
      store: new BooksStore()
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  async setInitialData() {
    const newStore = await BooksStore.newInstance(this.props.apiResource);
    this.setState({
      store: newStore
    });
  }

  async handleScroll() {
    // TODO jQuery依存は切りたい
    const scrollHeight = $(document).height();
    const scrollPosition = $(window).height() + $(window).scrollTop();

    // 画面最下部までスクロールしたタイミングで
    if ((scrollHeight - scrollPosition) / scrollHeight < 0.1) {
      if (this.state.store.isEnd) {
        return;
      }
      let newStore = this.state.store.set('isLoading', true);
      this.setState({
        store: newStore
      });
      newStore = await this.state.store.nextPage(this.props.apiResource);
      this.setState({
        store: newStore,
      });
    }
  }

  componentDidMount() {
    this.setInitialData();
    // ページングの処理を実装するためにスクロールイベントを追加
    window.addEventListener('scroll', this.handleScroll);
  }

  // スクロールイベント除去
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    return <Books dispatch={this.dispatch} {...this.state} />;
  }
}
