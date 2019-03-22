import React from 'react';


type FeedProps = {
  feed: FeedData,
  onClick: Function,
}

export const Feed = (props: FeedProps) => (
  <li
    className={props.feed.selected ? 'selected' : ''}
    onClick={e => props.onClick()}
  >
    <span className="name">{props.feed.name}</span>
    <span className="unread">({props.feed.unread})</span>
  </li>
);

