//미들웨어 
const middleware =store=>next=>action=>{
  // 우리가 하고자하는 작업
}
function middleware1(store){
  return function(next){
    return function(action){
      //우리가 하고자하는 작업
    }
  }
}
//next는 하나의 미들웨어에서 액션을 받아왔을때 다른 미들웨어로 전달이 되는 함수를 의미한다.
//다음 미들웨어가 없을때는 next을 통해 reducer에게 액션을 전달해준다.
//따라서 미들웨어에서 next을 사용하지않으면 특정한 액션을 무시할수있다.(리듀서까지 전달이 되지 않는다.)
//next(action)

const thunk =store =>next=>action=>{
  typeof action ==='function'
  ?action(store.dispatch,store.getState):next(action);
}
//해당하는 actiondㅣ 객체가 아니라 함수라면 해당하는action을 호출하겠다 아니면  다음 미들웨어를 받아오겠다.

const myThunk = ()=>(dispatch,getState)=>{
  dispatch({type:'HELLO'});
  dispatch({type:'HIHI'});
}
dispatch(myThunk());

//redux-thunk를 액션객체가 아닌 함수를 디스패치할수있다.
//비동기 작업을 처리하는경우에 사용한다.
const thunk =store=>next=>action=>{
  typeof action ==='function'?
  action(sotre.dispatch,store.getState):next(action);
}
//액션이 함수가 아니면 다음 미들웨어에 전달혹은 다음 미들웨어가 없으면 리듀서에 전달한다.
 //action에 store.dispatch,store.getState을 넣어주고 

 //thunk함수에서는 액션을 dispatch할수있고 getState로 상태로 확이할수있다.

 //프로미스를 사용한 방식 
const getComments =()=>(dispatch,getState)=>{
  //이안에서 액션을 dispatch할수도 있고
  //getState를 사용하여 현재 상태도 조회 할수있다.
  const id =getState().post.activeId;

  //요청이 시작했을을 알리는 액션
  dispatch({type:'GET_COMMENTS'});
  //댓글을 조회하는 프로미스를 반환하는 getcomments가 있다고 가정해보자
  api
  .getComments(id)//요청을 하고
  .then(comments=>dispatch({type:'GET_COMMENTS_SUCCESS',id,comments}))//성공시
  .catch(e=>dispatch({type:'GET_COMMENTS_ERROR',error:e}));//실패시
 }

 //async await을 사용한방식
const getCommments=()=>async(dispatch,getState)=>{
  const id =getState().post.activeId;
  dispatch({type:'GET_COMMENTS'});
  try{
    const comments =await api.getComments(id);
    dispatch({type:'GET_COMMETNS_SUCCESS',id,comments});
  }catch(e){
    dispatch({type:'GET_COMMETNS_ERROR',error:e})
  }
} 

//다른 컴포넌트에서 
dispatch(getComments());

//redux-saga 비동기 example

export const getPost=id=>({type:GET_POST,payload:id,meta:id});
function* getPostSaga(action){
  const id= action.payload;
  try{
    const post= yield call(postApi.getPostById,id);
    yield put({
       
      type:GET_POST_SUCCESS,
      payload:post,
      meta:id
    });
  }catch(e){
    yield put({
      type:GET_POST_ERROR,
      payload:e,
      meta:id
    });
  }
}
dispatch(getPost(1));