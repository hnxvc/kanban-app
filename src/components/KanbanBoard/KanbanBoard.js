import React from 'react';
import './KanbanBoard.css';

import List from './List/List';

class KanbanBoard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="KanbanBoard">
        <List />
      </div>
    );
  }
}

KanbanBoard.defaultProps = {
  children: 0
};

KanbanBoard.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default KanbanBoard;
