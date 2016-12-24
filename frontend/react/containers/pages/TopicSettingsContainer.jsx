import React from 'react';
import MicroContainer from 'react-micro-container';

import TopicSettings from '../../components/pages/TopicSettings';
import stateRecord from '../../states/topicSettings';

import { apiResource } from '../../main';

export default class TopicSettingsContainer extends MicroContainer {
  constructor(props) {
    super(props);
    this.state = {
      store: stateRecord
    };
  }

  async fetchTopicSettings() {
    const test = await apiResource.get('/api/v1/test');
    return test;
  }

  async setInitialData() {
    const test = await this.fetchTopicSettings();
  }

  componentDidMount() {
    this.setInitialData();
    this.subscribe({
    });
  }

  render() {
    return <TopicSettings dispatch={this.dispatch} {...this.state} />;
  }
}
