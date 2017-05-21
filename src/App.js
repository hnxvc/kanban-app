import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import KanbanContainer from './components/KanbanConatiner';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App__header">
          <img src={logo} className="App__logo" alt="logo" />
          <h2>Kanban App</h2>
        </div>
        <div className="App__body">
          <KanbanContainer />
        </div>
      </div>
    );
  }
}

export default App;
