import React, { Component } from 'react';

import { EntryStatus } from '../../utils/constants';


export type EntryProps = {
  entry: EntryData,
  feed: FeedData | undefined,
  onSave: Function,
  onRead: Function,
}

export class Entry extends Component<EntryProps> {
  render() {
    return (
      <div className={`entry ${this.getClassName()}`}>
        {this.renderHeader()}
        {this.renderContent()}
        {this.renderControl()}
      </div>
    );
  }

  getClassName() {
    const { entry: { status } } = this.props;
    switch (status) {
      case EntryStatus.Read: {
        return 'read';
      }
      case EntryStatus.Saved: {
        return 'saved';
      }
      default: {
        return '';
      }
    }
  }

  renderHeader() {
    const {
      entry: { title, date, url, author },
      feed,
    } = this.props;

    let titleEl = <>{title || 'Untitled'}</>;
    if (url) {
      titleEl = <a href={url} target="_blank">{titleEl}</a>;
    }

    let feedEl = null;
    if (feed) {
      feedEl = <>{feed.name || 'Untitled'}</>;
      if (feed.siteUrl) {
        feedEl = <a href={feed.siteUrl} target="_blank">{feedEl}</a>;
      }
    }

    return (
      <div className="header">
        <h2>{titleEl}</h2>
        <div className="meta">
          <p className="date">{date}</p>
          <p className="feed">
            from {feedEl}
            {author ? <>by <span className="author">{author}</span></> : null}
          </p>
        </div>
      </div>
    );
  }

  renderContent() {
    const { entry: { content, tags, commentsUrl } } = this.props;

    return (
      <div className="content">
        {content}

        {tags ? <p className="tags">{tags}</p> : null}
        {commentsUrl ? <p className="comments"><a href="{commentsUrl}">Comments</a></p> : null}
      </div>
    );
  }

  renderAsList() {
    return <></>
    /*
    <div class="entry_li">
      <div class="li_feed">{{ entry.feed.title }}</div>
      <div class="li_date">{{ entry.date|date:"M d Y, H:i" }}</div>
      <div class="li_entry">
        <span>{{ entry.title|default:"Untitled" }}</span>
        — {{ entry.content|truncatewords_html:30|striptags|default:"…" }}
      </div>
    </div>
    */
  }

  renderControl() {
    const { entry: { status }, onSave, onRead } = this.props;

    let save: JSX.Element | string = <a onClick={e => onSave()}>Save</a>;
    let read: JSX.Element = <a onClick={e => onRead()}>Mark as read</a>;

    if (status === EntryStatus.Read) {
      read = <a onClick={e => onRead()}>Mark as unread</a>;

    } else if (status === EntryStatus.Saved) {
      save = <span>Saved</span>;
      read = <a onClick={e => onRead()}>Discard as read</a>;
    }

    return (
      <div className="control">
        <ul>
          <li>{save}</li>
          <li>{read}</li>
        </ul>
      </div>
    );
  }
}
