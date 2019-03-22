import React from 'react';
import ReactDOM from 'react-dom';

import ListEntries from './pages/list_entries';


// Load an appropriate root element based on which page we're on
const pages: { [index: string]: JSX.Element } = {
  '.yarr-list-entries': <ListEntries />,
}

for (let selector in pages) {
  let el = document.querySelector(selector);
  if (!el) {
    continue;
  }

  ReactDOM.render(pages[selector], el);
  break;
}
