import React from 'react';
import KanbanBoard from './KanbanBoard/KanbanBoard';
import 'whatwg-fetch';
const API_URL = 'http://kanbanapi.pro-react.com';

class KanbanContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardsList: []
    }
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
        <KanbanBoard cards={this.state.cardsList}/>
      </div>
    );
  }
}

export default KanbanContainer;
