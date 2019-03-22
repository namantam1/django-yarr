import React, { SFC } from 'react';

import { Status } from '../Status'


export type LayoutProps = {
  control: JSX.Element
  sidebar?: JSX.Element
  content: JSX.Element
}

const Layout: SFC<LayoutProps> = props => {
  let sidebar: JSX.Element|null = null;
  if (props.sidebar) {
    sidebar = (
      <div className="sidebar">
        {props.sidebar}
      </div>
    );
  }

  return (
    <>
      <div className="control">
        {props.control}
      </div>

      <div className={`body${props.sidebar ? ' with-sidebar' : ''}`}>
        <Status />
        {sidebar}

        <div className="content">
          {props.content}
        </div>
      </div>
    </>
  );
}

export { Layout };
