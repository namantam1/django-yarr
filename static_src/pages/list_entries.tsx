import React, { Component } from 'react';
import { Provider } from 'unstated';

import { Layout } from '../components/Layout'
import { Control } from '../components/Control'
import { Sidebar } from '../components/Sidebar'
import { Content } from '../components/Content'

import { StatusContainer, FeedsContainer, EntriesContainer } from '../state';


// Initialise states
const status = new StatusContainer();
const feeds = new FeedsContainer();
const entries = new EntriesContainer({status, feeds});


export default class ListEntries extends Component {
  render() {
    return (
      <Provider inject={[status, feeds, entries]}>
        <Layout
          control={<Control/>}
          sidebar={<Sidebar/>}
          content={<Content/>}
        />
      </Provider>
    );
  }
};

// ++ TODO
feeds.load();
entries.load();
