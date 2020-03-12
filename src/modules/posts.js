//api에 데이터를 요청했을때 성공했을때의 상태 실패했을때의 상태를 관리 해줘야한다.
import * as postAPI from '../ api/posts';
import { reducerUtils, createPromiseThunk } from '../lib/asyncUtils';

// api을 요청하는 액션들을 만들어야한다.
//getPosts요청 하나당 3개의 액션을 가진다.
const GET_POSTS='GET_POSTS';//요청을 시작하겠다.
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCESS';
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

//getPostsById 요청
const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';


//액션 생성함수를 만들어 준다. 드러나 굳이 만들지 않고 생략하고 thunk함수가 dispatch할때 객체를 넘기는 방식을 사용하여도 된다.

//thunk생성함수
export const getPosts =createPromiseThunk(GET_POSTS,postAPI.getPosts);
export const getPost =createPromiseThunk(GET_POST,postAPI.getPostById);


//기본 상태
const initalState={
  posts:reducerUtils.initial(),
  post:reducerUtils.initial()
}

//해당하는 액션들을 처리해줄
//Reducer
export default function posts(state=initalState,action){
  switch(action.type){
    case GET_POSTS:
      return {
        ...state,
       posts:reducerUtils.loading()
      }
     case GET_POSTS_SUCCESS:
       return {
         ...state,
         posts:reducerUtils.success(action.payload)
       }
       case GET_POSTS_ERROR:
        return {
          ...state,
          posts:reducerUtils.error(action.payload)
        }
    case GET_POST:
      return {
        ...state,
       post:reducerUtils.loading()
      }
     case GET_POST_SUCCESS:
       return {
         ...state,
         post:reducerUtils.success(action.payload)
       }
       case GET_POST_ERROR:
        return {
          ...state,
          post:reducerUtils.error(action.payload)
        }
      default:
        return state;
  }
}
//리듀서의 반복되는 코드를 정리를 해준다.
