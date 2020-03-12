import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import rootReducer from './modules/';
// import myLogger from './middlewares/myLogger';
import {composeWithDevTools} from 'redux-devtools-extension';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk,logger)));

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>, document.getElementById('root'));
//이제 리덕스 적용은 끝이 났다 
//프리젠테이션 컴포넌트와 컴테이너 컴포넌트를 만들어 주면은 된다.

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
