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
  }

  addCard(card) {
    let prevState = fromJS(this.state.cards);
    if(card.id === null) {
      let card = Object.assign({}, card, {id: Date.now()})
    }

    let nextState = prevState.merge(card);

    this.setState({ cards: nextState });

    // [TODO] Add card with API

  }

  updateCard(card) {
    let prevState = fromJS(this.state.cards)
    let cardId = card.id;
    let cardIndex = this.state.cards.findIndex(card => card.id === cardId);
    let nextState = prevState.set(cardIndex, card);

    // [TODO] Update card with API
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

    fetch(API_URL+'/cards/'+cardId, {
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
    .then(response => {
      console.log('Update card success', response);
      return null;
    })
    .catch(error => {
      console.log('Update card error', error);
      // FIXME: revert back when update failed
      // this.setState({
      //
      // });
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
    .then(response => {
      console.log('Add success', response);
    })
    .catch(error => {
      console.log('Error', error);
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
        console.log('Remove success ', response);
        return response;
      } else {
        throw new Error('Server response wasn\'t OK');
      }
    })
    .catch(error => {
      console.log('Error ', error);
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
        console.log('Update success ', response);
        return response;
      } else {
        throw new Error('Server response wasn\'t OK');
      }
    })
    .catch(error => {
      console.log('Error ', error);
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
      console.log('ERROR ---', err);
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
          updateStatus: this.updateCardStatus,
          // updatePosition: throttle(this.updateCardPosition.bind(this),500),
          updateCardPosition: this.updateCardPosition,
          persistCardDrag: this.persistCardDrag
        }
      });
    return kanbanBoard;

    // return(
      // <div className="KanbanContainer">
      //   <KanbanBoard
      //     taskCallbacks={{
      //       add: this.addTask,
      //       remove: this.removeTask,
      //       toggle: this.toggleTask
      //     }}
      //     cardCallbacks={{
      //       updateCardPosition: this.updateCardPosition,
      //       updateCardStatus: this.updateCardStatus,
      //       persistCardDrag: this.persistCardDrag
      //     }}
      //     cards={this.state.cards}
      //   />
      // </div>
    // );
  }
}

export default KanbanContainer;
