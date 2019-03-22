/*
** Feed state management

Creates and maintains a list of feeds

  List of Feed components with title, url and unread count
  Requests from one API endpoint
  Knows Filter state
  Used by Feeds
*/
import { Container } from 'unstated';


type FeedsState = {
  feeds: FeedData[],
}


export class FeedsContainer extends Container<FeedsState> {
  public state: FeedsState;

  public constructor() {
    super();
    this.state = {
      feeds: [],
    };
  }

  public load = () => {
    // ++ TODO
    this.setState({
      feeds: [
        {feedId: 1, name: 'Feed 1', unread: 2, siteUrl: 'http://1.example.com', selected: true},
        {feedId: 2, name: 'Feed 2', unread: 2, siteUrl: 'http://2.example.com', selected: true},
      ]
    });

    // ++ this should be init or something, to load the first time
    // ++ then when state set, this should now load entries
    // ++ we then need a separate update() to update the unread counts
  }

  public getFeed = (feedId: number): FeedData | undefined => {
    return this.state.feeds.find(feed => feed.feedId === feedId);
  }

  public select = (feedIds: number[]) => {
    this.setState({
      feeds: this.state.feeds.map(
        feed => {
          return { ...feed, selected: (feedIds.includes(feed.feedId)) };
        }
      ),
    });

    // ++ TODO: should call entries.load
  }

  public selectAll = () => {
    this.select(
      this.state.feeds.map(feed => feed.feedId)
    );
  }

  public updateFeedUnread = (feedId: number, unread: number) => {
    this.setState({
      feeds: this.state.feeds.map(
        feed => (feed.feedId === feedId) ? { ...feed, unread } : feed
      ),
    });
  }
}
