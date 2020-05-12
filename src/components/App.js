import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import PostsIndex from './posts_index';
import PostsNew from './posts_new';
import PostsShow from './posts_show';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={PostsIndex} />
        <Route path="/posts/new" component={PostsNew} />
        <Route path="/posts/:id" component={PostsShow} />
      </Switch>
    </Router>
  );
}

export default App;
