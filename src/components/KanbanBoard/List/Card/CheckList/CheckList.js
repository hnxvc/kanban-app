import React from 'react';
import PropTypes from 'prop-types';
import './CheckList.css';

class CheckList extends React.Component {
  render() {
    let tasks = this.props.tasks.map(task => {
      return <li
                className="CheckList__task"
                key={task.id}
              >
                <input type="checkbox" defaultChecked={task.done}/>
                {task.name}
                <a href="#" className="checklist__task--remove" />
              </li>
    });

    return(
      <div className="CheckList">
        <ul>{tasks}</ul>
      </div>
    );
  }
}

CheckList.propTypes = {
  id: PropTypes.number,
  task: PropTypes.arrayOf(PropTypes.object)
};

export default CheckList;
