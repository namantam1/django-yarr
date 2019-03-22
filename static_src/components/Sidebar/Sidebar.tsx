import React, { Component } from 'react';
import { Subscribe } from 'unstated';

import { FeedsContainer, EntriesContainer } from '../../state'
import { Feed } from '../Feed'


export class Sidebar extends Component<{}> {
  render() {
    return (
      <Subscribe to={[FeedsContainer, EntriesContainer]}>
        {(feeds: FeedsContainer, entries: EntriesContainer) => (
          <div className="sidebar-body">
            <ul className="feed-list">
              {feeds.state.feeds.map(feed => (
                <Feed
                  key={feed.feedId}
                  feed={feed}
                  onClick={() => this.onClick(feeds, entries, feed)}
                />
              ))}
            </ul>
          </div>
        )}
      </Subscribe>
    );
  }

  onClick = (feeds: FeedsContainer, entries: EntriesContainer, feed: FeedData) => {
    entries.load(feed.feedId);
    feeds.select([feed.feedId]);
  }
}
