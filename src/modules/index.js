import {combineReducers} from 'redux';
import counter from './counter';
//루트 리듀서를 만든다.
//이후의 작업은 프로젝트에 리덕스를 적용해준다.
//index.js에서 Provider을 불러온다.

const rootReducer=combineReducers({
  counter
});

export default rootReducer;
