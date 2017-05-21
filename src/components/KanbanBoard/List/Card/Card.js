import React from 'react';
import './Card.css';

import CheckList from './CheckList/CheckList';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="Card">
        <CheckList />
      </div>
    );
  }
}

Card.defaultProps = {
  children: 0
};

Card.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default Card;
