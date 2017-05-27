import React from 'react';
import KanbanBoard from './KanbanBoard/KanbanBoard';
import 'whatwg-fetch';
const API_URL = 'http://kanbanapi.pro-react.com';

class KanbanContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardsList: []
    };

    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.toggleTask = this.toggleTask.bind(this);
  }

  addTask(cardId, taskName) {
    console.log('REMOVEME add task', cardId, taskName);
  }

  removeTask(cardId, taskId, taskIndex) {
    console.log('REMOVEME remove task', cardId, taskId, taskIndex);
  }

  toggleTask(cardId, taskId, taskIndex) {
    console.log('REMOVEME toggle task', cardId, taskId, taskIndex);
  }

  componentDidMount() {
    fetch(API_URL+'/cards')
    .then(result => result.json())
    .then(result => {
      this.setState({
        cardsList: result
      });
    })
    .catch(err => {
      console.log('ERROR ---', err);
    });
  }

  render() {
    return(
      <div className="KanbanContainer">
        <KanbanBoard
          taskCallbacks={{
            add: this.addTask,
            remove: this.removeTask,
            toggle: this.toggleTask
          }}
          cards={this.state.cardsList}/>
      </div>
    );
  }
}

export default KanbanContainer;
