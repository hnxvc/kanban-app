import React from 'react';
import './Card.css';
import PropTypes from 'prop-types';
import CheckList from './CheckList/CheckList';

class Card extends React.Component {
  render() {
    return(
      <div className="Card">
        <h4 className="Card__title">{this.props.title}</h4>
        <div className="Card__details">
          <p className="Card__descrition">{this.props.description}</p>
          <CheckList id={this.props.id} tasks={this.props.tasks}/>
        </div>
      </div>
    );
  }
}

Card.defaultProps = {
  children: 0
};

Card.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  task: PropTypes.arrayOf(PropTypes.object)
};

export default Card;
