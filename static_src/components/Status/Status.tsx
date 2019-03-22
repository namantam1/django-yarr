import React, { Component } from 'react';
import { Subscribe } from 'unstated';

import { StatusContainer } from '../../state'
import sheet from '../../utils/stylesheet'


sheet.insertRule('.hidden { display: none; }');
sheet.insertRule(`
    @keyframes fadeOut {
        from { opacity: 1; }
          to { opacity: 0; }
    }
`);
sheet.insertRule('.fadeOut { animation: fadeOut 1s }');


type StatusProps = {
  message?: string
}

class Status extends Component<StatusProps, {}> {
  public render() {
    return (
      <Subscribe to={[StatusContainer]}>
        {(status: StatusContainer) => (
          <div
            className={`status ${status.state.className}${status.state.isError ? ' error' : ''}`}
            onClick={status.close}
            onAnimationEnd={status.close}
          >{status.state.message}</div>
        )}
      </Subscribe>
    );
  }
}

export { Status };
