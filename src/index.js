import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer, { rootSaga } from './modules/';
// import myLogger from './middlewares/myLogger';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import {createBrowserHistory} from 'history';
//redux-saga
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware=createSagaMiddleware();
//thunk에 router을 벅용하는 방법
const customHistory = createBrowserHistory();


const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      //thunk 함수 안에서 router을 사용하기 위해서 thunk.withExtraArgument({객체로 history:customHistory});
      sagaMiddleware,
      ReduxThunk.withExtraArgument({ history: customHistory }),
      logger
      )));
      
//우리가 생성한 saga함수를 run을 호출해서 rootsaga을 파라미터로 넘겨준다.
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Router history={customHistory}>
    <Provider store={store} >
      <App />
    </Provider>
  </Router>
  , document.getElementById('root'));
//이제 리덕스 적용은 끝이 났다 
//프리젠테이션 컴포넌트와 컴테이너 컴포넌트를 만들어 주면은 된다.

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
