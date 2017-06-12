import React from 'react';
import PropTypes from 'prop-types';
import './CheckList.css';

class CheckList extends React.Component {
  constructor(props) {
    super(props);
    this.checkInputKeyPress = this.checkInputKeyPress.bind(this);
  }

  checkInputKeyPress(e) {
    if(e.key === 'Enter'){
      this.props.taskCallbacks.add(this.props.cardId, e.target.value);
      e.target.value = '';
    }
  }

  render() {
    let tasks = this.props.tasks.map((task, index) => {
      return <li
                className="CheckList__task"
                key={task.id}
              >
                <input
                  type="checkbox"
                  defaultChecked={task.done}
                  onChange={this.props.taskCallbacks.toggle.bind(null, this.props.cardId, task.id, index)}
                />
                {task.name +"  "}
                <span
                  className="Checklist__task--remove"
                  onClick={this.props.taskCallbacks.remove.bind(null, this.props.cardId, task.id, index)}
                />
              </li>
    });

    return(
      <div className="CheckList">
        <ul>{tasks}</ul>
        <input type="text"
          className="CheckList--add-task"
          placeholder="Type then hit Enter to add a task"
          onKeyPress={this.checkInputKeyPress}
        />
      </div>
    );
  }
}

CheckList.propTypes = {
  cardId: PropTypes.number,
  task: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.objectOf(PropTypes.func)
};

export default CheckList;
