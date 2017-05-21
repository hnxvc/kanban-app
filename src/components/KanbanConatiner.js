import React from 'react';
import KanbanBoard from './KanbanBoard/KanbanBoard';

class KanbanContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="KanbanContainer">
        <KanbanBoard />
      </div>
    );
  }
}

// KanbanContainer.defaultProps = {
//     children: 0
// };
//
// KanbanContainer.propTypes = {
//    children: React.PropTypes.element.isRequired
// };

export default KanbanContainer;
