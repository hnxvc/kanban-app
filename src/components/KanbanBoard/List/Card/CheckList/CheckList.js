import React from 'react';
import './CheckList.css';

class CheckList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="CheckList">
      </div>
    );
  }
}

CheckList.defaultProps = {
  children: 0
};

CheckList.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default CheckList;
