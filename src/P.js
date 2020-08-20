//리덕스 
//액션
export const ADD = 'ADD';
export const ADD_TODO = 'ADD_TODO';
//액션 생성함수 - 필수적이지않음 - 액션 생성함수를 사용하지않는 경우 액션을 발생시킬 액션 객체를 사용해 주면 된다. 
export function addTodo(data){
  return {
    type:ADD_TODO,
    data
  }
};
export const addTodo = (data)=>({
  type:ADD_TODO,
  data
})
export const changeInput  = text =>({
  type:'CHANGE_INPUT',
  text
})

import {cerateStore } from 'redux';
import { increase } from './modules/counter';

const inititalState = {
  counter:0,
  text:'',
  list:[]
};

const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';
const ADD_TEXT = 'ADD_TEXT';
const ADD_LIST = 'ADD_LIST';

const incerase = ()=>({
  type:INCERASE
});
const decrease = ()=>({
  type:DECREASE
});
const addText = (text)=>({
  type:ADD_TEXT,
  text
});
const addList = (item)=>({
  type:ADD_LIST,
  item
});

const reducer = (state = inititalState,action)=>{
  switch(action.type){
    case INCREASE:
      return {
        ...state,
        counter:state.coutner+1
      }
    case DECREASE:
      return {
        ...state,
        counter:state.counter-1
      }
    case ADD_TEXT:
      return {
        ...state,
        text:action.text
      }
    case ADD_LIST:
      return {
        ...state,
        list:state.list.concat(action.item)
      }
     default:
       return state       
  }
}

const store = createStore(reducer);
console.log(store.getState());

//구독을 하기위해서 ㅁ너저 listener을 만들어 준다.
const listner = ()=>{
  const store  = store.getState();
  console.log(store);
}
//구독을 하겠다. 즉 구독을 하겠다는 말의 의미는 상태가 변할때 마다 호출해 주겠다는 의미
const unsubscribe = stoere.subscribe(listner);

//구독을 취소 할때 
unsubscribe();

store.dispatch(increase());
store.dispatch(decrease());
store.dispatch(addText('안녕하세요'));
store.dispatch(addList({id:1,text:'wow'}));

//store을 ㅌ콘솔에서 사용할 수 있게 된다.
window.store = store;
store.dispatch({type:ADD_TEXT,text:'안녕하세요'});

window.unsubscribe = unsubscribe();
window.unsubscribe= unsubscribe()
////////

//리덕스 모듈 만들기(리덕스 모듈이란 액션 타입,액션 생성함수,리듀서를 모두 포함하는 것을 의미한다.)
//액션 타입,생성함수, 리듀서를 한번에 사용하는 덕스(Ducks) 패턴을 사용
//덕스 패턴(편리함)에서 reducer는 export default로 액션 생성함수는 export로 내보낸다. 




//미들웨어 
const middleware = store => next => action => {
  // 우리가 하고자하는 작업
}
function middleware1(store) {
  return function (next) {
    return function (action) {
      //우리가 하고자하는 작업
    }
  }
}
//next는 하나의 미들웨어에서 액션을 받아왔을때 다른 미들웨어로 전달이 되는 함수를 의미한다.
//다음 미들웨어가 없을때는 next을 통해 reducer에게 액션을 전달해준다.
//따라서 미들웨어에서 next을 사용하지않으면 특정한 액션을 무시할수있다.(리듀서까지 전달이 되지 않는다.)
//next(action)

const thunk = store => next => action => {
  typeof action === 'function'
    ? action(store.dispatch, store.getState) : next(action);
}
//해당하는 actiondㅣ 객체가 아니라 함수라면 해당하는action을 호출하겠다 아니면  다음 미들웨어를 받아오겠다.

const myThunk = () => (dispatch, getState) => {
  dispatch({ type: 'HELLO' });
  dispatch({ type: 'HIHI' });
}
dispatch(myThunk());

//redux-thunk를 액션객체가 아닌 함수를 디스패치할수있다.
//비동기 작업을 처리하는경우에 사용한다.
const thunk = store => next => action => {
  typeof action === 'function' ?
    action(sotre.dispatch, store.getState) : next(action);
}
//액션이 함수가 아니면 다음 미들웨어에 전달혹은 다음 미들웨어가 없으면 리듀서에 전달한다.
//action에 store.dispatch,store.getState을 넣어주고 

//thunk함수에서는 액션을 dispatch할수있고 getState로 상태로 확이할수있다.

//프로미스를 사용한 방식 
const getComments = () => (dispatch, getState) => {
  //이안에서 액션을 dispatch할수도 있고
  //getState를 사용하여 현재 상태도 조회 할수있다.
  const id = getState().post.activeId;

  //요청이 시작했을을 알리는 액션
  dispatch({ type: 'GET_COMMENTS' });
  //댓글을 조회하는 프로미스를 반환하는 getcomments가 있다고 가정해보자
  api
    .getComments(id)//요청을 하고
    .then(comments => dispatch({ type: 'GET_COMMENTS_SUCCESS', id, comments }))//성공시
    .catch(e => dispatch({ type: 'GET_COMMENTS_ERROR', error: e }));//실패시
}

//async await을 사용한방식
const getCommments = () => async (dispatch, getState) => {
  const id = getState().post.activeId;
  dispatch({ type: 'GET_COMMENTS' });
  try {
    const comments = await api.getComments(id);
    dispatch({ type: 'GET_COMMETNS_SUCCESS', id, comments });
  } catch (e) {
    dispatch({ type: 'GET_COMMETNS_ERROR', error: e })
  }
}

//다른 컴포넌트에서 
dispatch(getComments());

//redux-saga 비동기 example

export const getPost = id => ({ type: GET_POST, payload: id, meta: id });
function* getPostSaga(action) {
  const id = action.payload;
  try {
    const post = yield call(postApi.getPostById, id);
    yield put({

      type: GET_POST_SUCCESS,
      payload: post,
      meta: id
    });
  } catch (e) {
    yield put({
      type: GET_POST_ERROR,
      payload: e,
      meta: id
    });
  }
}
dispatch(getPost(1));

export const getPosts = (id) => async (dispatch) => {
  dispatch({ type: GET_POSTS });
  try {
    const posts = postAPI.getPosts();
    dispatch({
      type: GET - POST_SUCCESS,
      payload: posts
    });
  } catch (e) {
    dispatch({
      typE: GET_POST_ERROR,
      payload: e,
      error: true
    })
  }
}

import { call, put, takeEvery } from 'redux-saga/effects';
import { counterSaga } from './modules/counter';

export const getPosts = () => ({ type: GET_POSTS });
export const getPost = (id) => ({ type: GET_POST, payload: id, meta: id });

function* getPostsSaga() {
  const posts = yield call(postAPI.getPost);
  try {
    yield put({
      type: GET_POSTS_SUCCESS,
      payload: posts,
    });
  } catch (e) {
    yield put({
      type: GET_POSTS_ERROR,
      payload: e,
      error: true
    })
  }
}
function* getPostSaga(action) {
  const param = action.payload;
  const id = action.id
  try {
    const post = yield call(postAPI.getPostById, param);
    yield put({
      type: GET_POST_SUCCESS,
      payload: post,
      meta: id
    })
  } catch (e) {
    type: GET_POST_ERROR,
      payload: e,
        error: true,
          meta: id
  }
}

function* postSaga() {
  yield takeEvery(GET_POSTS, getPostsSaga);
  yield takeEvery(GET_POST, getPostSaga);
};

function* rootSaga() {
  yield all([counterSaga(), postSaga()]);
}

//SAGA UTIL함수

export const createPostsSaga = async (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return function* (action) {
    try {
      const payload = yield call(promiseCreator, action.payload);
      yield put({ type: SUCCESS, payload });
    } catch (e) {
      yield put({ type: ERROR, payload: e, error: true });
    }
  }
}
export const createPostSaga = async (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return function* (action) {
    const id = action.meta;
    try {
      const payload = yield call(promiseCreator, action.payload);
      yield put({
        type: SUCCESS,
        payload,
        meta: id
      })
    } catch (e) {
      yield put({
        type: ERROR,
        payoad: e,
        error: true,
        meta: id
      })
    }
  }
}
//module.counter

const INCREASE = 'INCREASE ';
const DECREASE = 'DECREASE';

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

const initalState = 0;

export function counter(state = initalState, action) {
  switch (action.type) {
    case INCREASE:
      return state + 1;
    case DECREASE:
      return state - 1;
  }
}

//module index
import { combineReducers } from 'redux';

export default rootReducer = combineReducers({
  counter
});
//redux middleware 
const middleware = store => next => action => {

}

function middleware(store) {
  return function (next) {
    return function (action) {

    }
  }
}
//1.store 파리미터 getState,subscribe,dispatch
//2.next 다음 미들웨어로 전달하는 함수
//3.action 현재 처리하고 있는 액션


const thunk = store = next => action => {
  typeof action === 'function' ?
    action(store.dispatch, store.getState) :
    next(action);
}

const myThunk = () => (dispatch, getState) => {
  dispatch({ type: 'HELLO' });
  dispatch({ type: 'BYE' });
}
dispatch(myThunk());

const sleep = n => new Promise(resolve => setTimeout(resolve, n));

const posts = [
  {}
];

export const getPosts = async () => {
  sleep(500);
  return posts;
}
export const getPostById = async (id) => {
  sleep(500);
  return posts.find(post => post.id === id);
}
export const createPromiseThunk = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return param => async dispatch => {
    dispatch({ type, parma });
    try {
      const payload = await promiseCreator(param);
      dispatch({ type: SUCCESS, payload });
    } catch (e) {
      dispatch({ type: ERROR, payload: e, error: true });
    }
  }
}

export const reducerUtils = {
  inital: (initialData = null) => ({
    loading: false,
    data: initialData,
    error: null,
  }),
  loading: (prevState = null) => ({
    loading: true,
    data: prevState,
    error: null
  }),
  success: payload => ({

    loading: false,
    data: payload,
    error: null
  }),
  error: error => ({
    loading: false,
    data: null,
    error
  })
}
//key는  posts또는 post 
export const handleAsyncActions = (type, key) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: reducerUtils.loading()
        }
      case SUCCESS:
        return {
          ...state,
          [key]: reducerUtils.success(action.payload)
        }
      case ERROR:
        return {
          ...state,
          [key]: reducerUtils.error(action.payload)
        }
      default:
        return state;

    }
  }
}
const defaultSelector = param => param;

export const createPromiseById = (type, promiseCreator, idSelector = defaultSelector) => {
  //{id:1,deftials:true} idSelector param=>parsm.id

  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  return param => async dispatch => {
    const id = idSelector(param);
    dispatch({ type, meta: id });
    try {
      const payload = await promiseCreator(param);
      dispatch({ type: SUCCESS, payload, meta: id });

    } catch (e) {
      dispatch({ type: ERROR, payload: e, meta: id, error: true });
    }
  }
}

export const handleAsyncActions=(type,key,keepData)=>{
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (state,action)=>{
    const id= action.meta;
    switch(action.type){
      case type:
        return {
          ...state,
          [key]:{
            ...state[key],
            [id]:reducerUtils.loading(
              keepData? state[key][id] && state[key][id].data:null
            ) 
          }
        }
        case SUCCESS:
          return {
            ...state,
            [key]:{
              ...state[key],
              [id]:reducerUtils.success(action.payload)
            }
          }
         case ERROR:
           return {
             ...state,
             [key]:{
               ...state[key],
               [id]:reducerUtils.error(action.paload)
             }
           }
          default:
            return state;  
    }
  
  }
  
}