import React from 'react';
import PostListPage from './pages/PostListPage';
import PostPage from './pages/PostPage';
import { Route } from 'react-router-dom';
import CounterCountainers from './containers/CounterCountainers';
import PostListContainer from './containers/PostListContainer';

function App() {
  return (
    <>
      <CounterCountainers/>
      <PostListContainer/>
      <Route path="/" component={PostListPage} exact={true} />
      <Route path="/:id" component={PostPage} />
    </>
  );
}

export default App;

