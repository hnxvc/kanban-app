import React from 'react';
import './List.css';
import PropTypes from 'prop-types';
import Card from './Card/Card';

class List extends React.Component {
  render() {
    let cards = this.props.cards.map(card => {
      return <Card
        key={card.id}
        cardId={card.id}
        title={card.title}
        description={card.description}
        tasks={card.tasks}
        color={card.color}
        taskCallbacks={this.props.taskCallbacks}
      />
    });

    return(
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
  title: PropTypes.string,
  cards: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.objectOf(PropTypes.func)
};

export default List;
