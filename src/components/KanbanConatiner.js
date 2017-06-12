import React from 'react';
import KanbanBoard from './KanbanBoard/KanbanBoard';
import { fromJS, toJS } from 'immutable';
import { throttle } from '../utils/utils';
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
    this.updateCardStatus = this.updateCardStatus.bind(this);
    // FIXME: Why use throttle can't update status
    // this.updateCardStatus = throttle(this.updateCardStatus.bind(this));
    // this.updateCardPosition = throttle(this.updateCardPosition.bind(this));
    this.updateCardPosition = this.updateCardPosition.bind(this);
    this.persistCardDrag = this.persistCardDrag.bind(this);
    this.addCard = this.addCard.bind(this);
    this.updateCard = this.updateCard.bind(this);
  }

  addCard(card) {
    let prevState = fromJS(this.state.cards);
    card.id = Date.now();
    card.tasks = [];
    let nextState = prevState.push(card);
    this.setState({
      cards: nextState.toJS()
    });

    fetch(API_URL+'/cards', {
      method: 'POST',
      headers: API_HEADERS,
      body: JSON.stringify(card)
    })
    .then(response => {
      if(response.ok) {
        return response.json();
      } else {
        throw new Error('Server response wasn\'t OK');
      }
    })
    .catch(err=> {
      this.setState({
        cards: prevState.toJS()
      });
      console.log('Add card error ----', err);
    })
  }

  updateCard(card) {
    let prevState = fromJS(this.state.cards)
    let cardId = card.id;
    let cardIndex = this.state.cards.findIndex(card => card.id == cardId);
    let nextState = prevState.set(cardIndex, card);
    this.setState({
      cards: nextState.toJS()
    });

    fetch(API_URL+'/cards/' + cardId, {
      method: 'PUT',
      headers: API_HEADERS,
      body: JSON.stringify(card)
    })
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        throw new Error('Server response wasn\'t OK');
      }
    })
    .catch(err => {
      console.log('Update card error', err);
      this.setState({
        cards: prevState.toJS()
      });
    })
  }

  updateCardStatus(cardId, listId) {
    let prevState = fromJS(this.state.cards);

    let cardIndex = this.state.cards.findIndex(card => card.id === cardId);
    let card = prevState.get(cardIndex);
    card = card.set('status', listId);

    let nextState = prevState.set(cardIndex, card);

    if(card.status !== listId) {
      this.setState({
        cards: nextState.toJS()
      });
    }
  }

  updateCardPosition(cardId, afterId) {
    if(cardId === afterId) {
      return;
    }

    let prevState = fromJS(this.state.cards);

    let cardIndex = this.state.cards.findIndex(card => card.id === cardId);
    let card = prevState.get(cardIndex);

    let afterIndex = this.state.cards.findIndex(card => card.id ===afterId);

    let nextState = prevState.delete(cardIndex);
    nextState = nextState.insert(afterIndex, card);
    this.setState({
      cards: nextState.toJS()
    });

  }

  persistCardDrag(cardId, status) {
    let cardIndex = this.state.cards.findIndex(card => card.id===cardId);
    let card = this.state.cards[cardIndex];

    if(card.status === status) {
      return;
    }

    fetch(API_URL+'/cardss/'+cardId, {
      method: 'PUT',
      headers: API_HEADERS,
      body: JSON.stringify({
        status: card.status,
        row_order_position: cardIndex
      })
    })
    .then(response => {
      if(!response.ok) {
        throw new Error('Server response was not ok');
      } else {
        return response.json();
      }
    })
    .catch(error => {
      console.log('persistCardDrag error', error);

      let cards = fromJS(this.state.cards);
      let oldCard = cards.get(cardIndex).set('status', status);
      let prevState = cards.set(cardIndex, oldCard);
      this.setState({
        cards: prevState.toJS()
      });
    });
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
    .catch(error => {
      console.log('Add task error', error);
      this.setState({
        cards: prevState.toJS()
      });
    });
  }

  removeTask(cardId, taskId, taskIndex) {
    let cardIndex = this.state.cards.findIndex(card => card.id === cardId);

    let prevState = fromJS(this.state.cards);

    let newTasks = prevState.getIn([cardIndex,"tasks"]);
    newTasks = newTasks.delete(taskIndex);

    let nextState = prevState.setIn([cardIndex, 'tasks'], newTasks.toJS());

    this.setState({
      cards: nextState.toJS()
    });

    fetch(API_URL+'/cards/'+cardId+'/tasks/'+taskId,{
      method: 'DELETE',
      headers: API_HEADERS
    })
    .then(response => {
      if(response.ok) {
        return response;
      } else {
        throw new Error('Server response wasn\'t OK');
      }
    })
    .catch(error => {
      console.log('Remove task error ', error);
      this.setState({
        cards: prevState.toJS()
      });
    });

  }

  toggleTask(cardId, taskId, taskIndex) {
    let cardIndex = this.state.cards.findIndex(card => card.id === cardId);
    let prevState = fromJS(this.state.cards);

    let newStatus;
    let updateTask = prevState.getIn([cardIndex,"tasks"]);
    updateTask = updateTask.updateIn([taskIndex,'done'], val=> {
      newStatus = !val;
      return newStatus;
    });

    let nextState = prevState.setIn([cardIndex, 'tasks'], updateTask.toJS());

    this.setState({
      cards: nextState.toJS()
    });

    fetch(API_URL+'/cards/'+cardId+'/tasks/'+taskId,{
      method: 'PUT',
      headers: API_HEADERS,
      body: JSON.stringify({done:newStatus})
    })
    .then(response => {
      if(response.ok) {
        return response;
      } else {
        throw new Error('Server response wasn\'t OK');
      }
    })
    .catch(error => {
      console.log('Toggle task error ', error);
      this.setState({
        cards: prevState.toJS()
      });
    });

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
      console.log('Fetch data error ---', err);
    });
  }

  render() {
    let kanbanBoard = this.props.children && React.cloneElement(this.props.children, {
          cards: this.state.cards,
          taskCallbacks:{
            toggle: this.toggleTask,
            remove: this.removeTask,
            add: this.addTask
          },

        cardCallbacks:{
          addCard: this.addCard,
          updateCard: this.updateCard,
          updateCardStatus: this.updateCardStatus,
          // updatePosition: throttle(this.updateCardPosition.bind(this),500),
          updateCardPosition: this.updateCardPosition,
          persistCardDrag: this.persistCardDrag
        }
      });
    return kanbanBoard;
  }
}

export default KanbanContainer;
