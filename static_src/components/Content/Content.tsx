import React from 'react';
import { Subscribe } from 'unstated';

import { FeedsContainer, EntriesContainer } from '../../state'
import { EntryStatus } from '../../utils/constants';
import { Entry } from '../Entry'



const Content = () => (
  <Subscribe to={[FeedsContainer, EntriesContainer]}>
    {(feeds: FeedsContainer, entries: EntriesContainer) => (
      <>
        {entries.state.entries.map(entry => (
          <Entry
            key={entry.entryId}
            entry={entry}
            feed={feeds.getFeed(entry.feedId)}
            onSave={() => entries.markSaved(entry.entryId)}
            onRead={() => entry.status === EntryStatus.Read ? entries.markUnread(entry.entryId) : entries.markRead(entry.entryId)}
          />
        ))}
      </>
    )}
  </Subscribe>
);

export { Content }
