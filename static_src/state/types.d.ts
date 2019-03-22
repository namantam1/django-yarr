/*
** Global types for state objects
*/

type FeedData = {
  feedId: number,
  name: string,
  siteUrl: string | null,
  unread: number,
  selected?: boolean,
}

type EntryData = {
  entryId: number,
  feedId: number,
  title: string,
  date: string,
  content: string,
  url?: string | null,
  author?: string | null,
  tags?: string | null,
  commentsUrl?: string | null,
  status?: number,
}
