import {combineReducers} from 'redux';
import counter, { counterSaga } from './counter';
import posts, { postsSaga } from './posts';
//루트 리듀서를 만든다.
//이후의 작업은 프로젝트에 리덕스를 적용해준다.
//index.js에서 Provider을 불러온다.
import {all, call} from 'redux-saga/effects'

const rootReducer = combineReducers({
  counter,
  posts,
});

export function* rootSaga(){
yield all([counterSaga(),postsSaga()]);
}

//---------------index.js에서 redux-saga을 불러 준다.
export default rootReducer;
