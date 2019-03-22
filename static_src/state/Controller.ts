/*
** Control interaction between states

Simple wrapper to make all object optional until they're needed, avoiding
null checks whenever they're used.
*/

import { Container as BaseContainer } from 'unstated';


export class Container extends BaseContainer<*> {
  public _status: StatusContainer | null;
  public _feeds: FeedsContainer | null;
  public _entries: EntriesContainer | null;

  public constructor(opts: {status?, feeds?, entries?}) {
    self._status = status;
    self._feeds = feeds;
    self._entries = entries;
  }

  public get status(): StatusContainer {
    if (self.status === null) {
      throw new Error('Status not registered');
    }
    return self.status;
  }
}
