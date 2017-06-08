import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import KanbanContainer from './components/KanbanConatiner';
import { Link } from 'react-router';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App__header">
          <img src={logo} className="App__logo" alt="logo" />
          <Link to={"/new"}>New</Link>
          <Link to={"/edit/2"}>Edit</Link>
          <h2>Kanban App</h2>
        </div>
        <div className="App__body">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
