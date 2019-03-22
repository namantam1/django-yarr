/*
** Entries state management

Creates and maintains a list of active data for entries
*/
import { Container } from 'unstated';

import { EntryStatus } from '../utils/constants';
import { StatusContainer } from './Status'
import { FeedsContainer } from './Feeds'


export type EntriesConstructor = {
  status: StatusContainer;
  feeds: FeedsContainer;
}


type EntriesState = {
  entries: EntryData[],
};


export class EntriesContainer extends Container<EntriesState> {
  public status: StatusContainer;
  public feeds: FeedsContainer;
  public state: EntriesState;

  public constructor(opts: EntriesConstructor) {
    super();
    this.status = opts.status;
    this.feeds = opts.feeds;
    this.state = {
      entries: [],
    };
  }

  public load = (feedId?: number) => {
    // ++ TODO: Implement true loader
    let entries: EntryData[] = [
      {feedId: 1, entryId: 1, title: 'Title 1', date: '2019-01-01', content: 'Content 1', status: EntryStatus.Unread, url: 'http://e1.example.com' },
      {feedId: 1, entryId: 2, title: 'Title 2', date: '2019-01-01', content: 'Content 2', status: EntryStatus.Unread, url: 'http://e2.example.com' },
      {feedId: 2, entryId: 3, title: 'Title 3', date: '2019-01-01', content: 'Content 3', status: EntryStatus.Unread, url: 'http://e3.example.com' },
      {feedId: 2, entryId: 4, title: 'Title 4', date: '2019-01-01', content: 'Content 4', status: EntryStatus.Unread, url: 'http://e4.example.com' },
    ];

    if (feedId) {
      entries = entries.filter(entry => entry.feedId === feedId);
    }

    this.setState({
      entries: entries,
    });
  }

  public getEntry = (entryId: number): EntryData | undefined => {
    if (!this.state.entries) {
      return undefined;
    }
    return this.state.entries.find(entry => entry.entryId === entryId);
  }

  private updateEntry(entryId: number, status: EntryStatus) {
    const entry = this.getEntry(entryId);
    if (!entry) {
      return;
    }

    // Update display
    this.setState({
      entries: this.state.entries.map(
        entry => (entry.entryId === entryId) ? { ...entry, status } : entry
      ),
    });

    // Update feed count
    let countModifier = 0;
    // If old status was unread and it's now not unread, decrement
    if (entry.status === EntryStatus.Unread && status !== EntryStatus.Unread) {
      countModifier = -1;
    // If old status was not unread and now it's unread, increment
    } else if (entry.status !== EntryStatus.Unread && status === EntryStatus.Unread) {
      countModifier = 1;
    }

    if (countModifier !== 0) {
      const feed = this.feeds.getFeed(entry.feedId);
      if (feed) {
        this.feeds.updateFeedUnread(entry.feedId, feed.unread + countModifier);
      }
    }

    // ++ TODO: API Call
  }

  public markRead = (entryId: number) => {
    this.updateEntry(entryId, EntryStatus.Read);
    this.status.set('Marked as read');
  }

  public markSaved = (entryId: number) => {
    this.updateEntry(entryId, EntryStatus.Saved);
    this.status.set('Saved');
  }

  public markUnread = (entryId: number) => {
    this.updateEntry(entryId, EntryStatus.Unread);
    this.status.set('Marked as unread');
  }
}
