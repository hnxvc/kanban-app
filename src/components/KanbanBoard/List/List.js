import React from 'react';
import './List.css';

import Card from './Card/Card';

class List extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="List">
        <Card />
      </div>
    );
  }
}

List.defaultProps = {
  children: 0
};

List.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default List;
