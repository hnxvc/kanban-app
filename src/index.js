import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createMemoryHistory';
import App from './App';
import KanbanContainer from './components/KanbanConatiner';
import NewCard from './components/KanbanBoard/NewCard/NewCard';
import EditCard from './components/KanbanBoard/EditCard/EditCard';

ReactDOM.render(
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App}>
      <IndexRoute component={KanbanContainer}/>
      <Route path="/new" component={NewCard}></Route>
      <Route path="/edit/:card_id" component={EditCard}></Route>
    </Route>
  </Router>,
  document.getElementById('root')
);
