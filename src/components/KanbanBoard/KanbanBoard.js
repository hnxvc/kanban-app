import React from 'react';
import './KanbanBoard.css';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import List from './List/List';
import { Link } from 'react-router';

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

    let cardModal = this.props.children && React.cloneElement(this.props.children, {
      cards: cards,
      cardCallbacks: this.props.cardCallbacks }
    );

    console.log('REMOEME === cardModal', cardModal);
    console.log('REMOEME === children', this.props.children);

    return(
      <div className="KanbanBoard">
        <List
          id="todo"
          title="Todo"
          cards={todoList}
          taskCallbacks={this.props.taskCallbacks}
          cardCallbacks={this.props.cardCallbacks}
        />

        <List
          id="in-progress"
          title="Progress"
          cards={inProgreesList}
          taskCallbacks={this.props.taskCallbacks}
          cardCallbacks={this.props.cardCallbacks}
        />

        <List
          id="done"
          title="Done"
          cards={doneList}
          taskCallbacks={this.props.taskCallbacks}
          cardCallbacks={this.props.cardCallbacks}
        />
        <Link to='/new' className="float-button">+</Link>
        {cardModal}
      </div>
    );
  }
}

KanbanBoard.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.objectOf(PropTypes.func),
  cardCallbacks: PropTypes.objectOf(PropTypes.func)
};

export default DragDropContext(HTML5Backend)( KanbanBoard);
