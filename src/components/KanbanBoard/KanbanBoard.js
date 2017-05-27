import React from 'react';
import './KanbanBoard.css';
import PropTypes from 'prop-types';

import List from './List/List';

class KanbanBoard extends React.Component {
  render() {
    let cards = this.props.cards;

    let todoList = cards.filter( card => {
      return card.status === 'todo';
    });

    let inProgreesList =  cards.filter( card => {
      return card.status === 'in-progress';
    });

    let doneList = cards.filter( card => {
      return card.status === 'done';
    });

    return(
      <div className="KanbanBoard">
        <List
          id="todo"
          title="Todo"
          cards={todoList}
          taskCallbacks={this.props.taskCallbacks}
        />

        <List
          id="in-progress"
          title="Progress"
          cards={inProgreesList}
          taskCallbacks={this.props.taskCallbacks}
        />

        <List
          id="done"
          title="Done"
          cards={doneList}
          taskCallbacks={this.props.taskCallbacks}
        />
        
      </div>
    );
  }
}

KanbanBoard.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.objectOf(PropTypes.func)
};

export default KanbanBoard;
