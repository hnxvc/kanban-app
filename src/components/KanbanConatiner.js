import React from 'react';
import KanbanBoard from './KanbanBoard/KanbanBoard';
import { fromJS, toJS } from 'immutable';
import 'whatwg-fetch';
const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
  'Content-Type': 'application/json',
};

class KanbanContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };

    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.toggleTask = this.toggleTask.bind(this);
  }

  addTask(cardId, taskName) {
    let cardIndex = this.state.cards.findIndex(card => card.id === cardId);
    let prevState = fromJS(this.state.cards);

    let newTask = {
      id: Date.now(),
      name: taskName,
      done: false
    };

    let newTasks = prevState.getIn([cardIndex,"tasks"]);
    newTasks = newTasks.push(newTask);

    let nextState = prevState.setIn([cardIndex, 'tasks'], newTasks.toJS());

    this.setState({
      cards: nextState.toJS()
    });

    fetch(API_URL+'/cards/'+cardId+'/tasks', {
      method: 'POST',
      headers: API_HEADERS,
      body: JSON.stringify(newTask)
    })
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        throw new Error('Server response wasn\'t OK');
      }
    })
    .then(response => {
      console.log('Update success', response);
    })
    .catch(error => {
      console.log('Error', error);
      this.setState({
        cards: prevState.toJS()
      });
    });
  }

  removeTask(cardId, taskId, taskIndex) {
    console.log('REMOVEME remove task', cardId, taskId, taskIndex);
  }

  toggleTask(cardId, taskId, taskIndex) {
    console.log('REMOVEME toggle task', cardId, taskId, taskIndex);
  }

  componentDidMount() {
    fetch(API_URL+'/cards', {
      headers: API_HEADERS
    })
    .then(result => result.json())
    .then(result => {
      this.setState({
        cards: result
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
          cards={this.state.cards}/>
      </div>
    );
  }
}

export default KanbanContainer;
