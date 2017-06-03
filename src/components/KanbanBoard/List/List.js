import React from 'react';
import './List.css';
import PropTypes from 'prop-types';
import Card from './Card/Card';
import { DropTarget } from 'react-dnd';
import constants from '../../../constants';

const listTargetSpec = {
  hover(props, monitor) {
    const draggedId = monitor.getItem().cardId;
    props.cardCallbacks.updateCardStatus(draggedId, props.id)
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

class List extends React.Component {
  render() {

    const { connectDropTarget } = this.props;
    let cards = this.props.cards.map(card => {
      return <Card
        key={card.id}
        cardId={card.id}
        status={card.status}
        title={card.title}
        description={card.description}
        tasks={card.tasks}
        color={card.color}
        taskCallbacks={this.props.taskCallbacks}
        cardCallbacks={this.props.cardCallbacks}
      />
    });

    return connectDropTarget(
      <div className="List">
        <h2 className="List__title">{this.props.title}</h2>
        {cards}
      </div>
    );
  }
}

List.defaultProps = {
  children: 0
};

List.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  cards: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.objectOf(PropTypes.func),
  cardCallbacks: PropTypes.objectOf(PropTypes.func),
  connectDropTarget: PropTypes.func
};

export default DropTarget(constants.CARD, listTargetSpec, collect)(List);
