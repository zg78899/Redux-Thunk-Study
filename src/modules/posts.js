//api에 데이터를 요청했을때 성공했을때의 상태 실패했을때의 상태를 관리 해줘야한다.
import * as postAPI from '../ api/posts';
import {
  reducerUtils,
  // createPromiseThunk,
  handleAsyncActions,
  handleAyncActionsById,
  // createPromiseThunkById,
  createPromiseSagaById,
  createPromiseSaga
} from '../lib/asyncUtils';
import {takeEvery } from 'redux-saga/effects'
// api을 요청하는 액션들을 만들어야한다.
//getPosts요청 하나당 3개의 액션을 가진다.
const GET_POSTS = 'GET_POSTS';//요청을 시작하겠다.
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

//getPostsById 요청
const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';

//새로운 상태를 만들어 준다.PostList을 클릭한뒤 뒤로갔을때 상태를 비워줘야지 다른 list을 클릭했을때 잔상 같은 것이 남는 것을 해결해줄수있다.
//액션 생성함수를 만들어 준다. 드러나 굳이 만들지 않고 생략하고 thunk함수가 dispatch할때 객체를 넘기는 방식을 사용하여도 된다.
const CLEAR_POST = 'CLEAR_POST';

export const getPosts = () => ({ type: GET_POSTS });
export const getPost = (id) => ({
  type: GET_POST,
  payload: id,
  meta: id
});

//saga생성함수을 util함수로 2줄로 줄일수있다
const getPostsSaga=createPromiseSaga(GET_POSTS,postAPI.getPosts);
const getPostSaga =createPromiseSagaById(GET_POST,postAPI.getPostById);

//saga생성함수
// function* getPostsSaga() {
//   try {
//     const posts = yield call(postAPI.getPosts);
//     yield put({
//       type: GET_POSTS_SUCCESS,
//       payload: posts
//     })
//   } catch (e) {
//     yield put({
//       type: GET_POSTS_ERROR,
//       payload: e,
//       error: true
//     })
//   }
// }
//saga 생성함수에서  파라미터로 값을 넣어주기위해서 dispatch된 액션 정보를 확인해야한다.그것은
//파라미터로 action을 넣어주는것
// function* getPostSaga(action) {
//   const id = action.payload;
//   try {
//     const post = yield call(postAPI.getPostById, id);
//     yield put({
//       type: GET_POST_SUCCESS,
//       payload: post,
//       meta: id
//     })
//   } catch (e) {
//     yield put({
//       type: GET_POST_ERROR,
//       payload: e,
//       error: true,
//       meta: id
//     })
//   }
// }
//-------------saga 생성함수를 모니터링하는 함수
export function* postsSaga(){
yield takeEvery(GET_POSTS,getPostsSaga);
yield takeEvery(GET_POST,getPostSaga);
}

//thunk생성함수
// export const getPosts = createPromiseThunk(GET_POSTS, postAPI.getPosts);
// export const getPost = createPromiseThunkById(GET_POST, postAPI.getPostById);
//액션 생성 함수도 만들어 준다.이후에 리듀서도 만들어 준다.
export const clearPost = () => ({ type: CLEAR_POST });

export const goToHome = () => (dispatch, getState, { history }) => {
  history.push('/');
}
//기본 상태
const initialState = {
  posts: reducerUtils.initial(),
  post: {}
}

//해당하는 액션들을 처리해줄
//Reducer

const getPostsReducer = handleAsyncActions(GET_POSTS, 'posts', true);
const getPostReducer = handleAyncActionsById(GET_POST, 'post', true);

export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return getPostsReducer(state, action);
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return getPostReducer(state, action);
    case CLEAR_POST:
      return {
        ...state,
        post: reducerUtils.initial()
      }
    default:
      return state;
  }
}
//리듀서의 반복되는 코드를 정리를 해준다.
