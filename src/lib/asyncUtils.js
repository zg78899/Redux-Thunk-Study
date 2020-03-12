//리듀서 Utils라는 객체를 선언해주겠다.
export const reducerUtils={
  //초기 상태를 간단하게 만들기 위한 Util함수
  initial:(data=null)=>({
    data,
    loading:false,
    error:null
  }),
  loading:(prevState = null )=>({
    data:prevState,
    loading:true,
    error:null,
  }),
  success:data =>({
    data,
    loading:false,
    error:null
  }),
  error:error=>({
    data:null,
    loading:false,
    error
  })
};

//동일한 thunk생성 함수를 처리하는 함수
//type은 GET_POSTS,GET_POST갑ㅌ은 문자열 타입
//promiseCreator는 특정 파라미터를 가져와서 프로미스로 만드는 함수
export const createPromiseThunk=(type,promiseCreator)=>{
const [SUCCESS,ERROR]=[`${type}_SUCCESS`,`${type}_ERROR`];

//thunk를 만들어주는 함수
const thunkCreator = param => async dispatch => {
  dispatch({type})
  try{
    const payload =await promiseCreator(param);
    dispatch({
      type:SUCCESS,
      payload//결과값 posts또는 post
    })
  }catch(e){
    dispatch({
      type:ERROR,
      payload:e,
      error:true,
    })
  }
}
return thunkCreator;
}