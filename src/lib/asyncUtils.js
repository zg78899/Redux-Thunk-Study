//동일한 thunk생성 함수를 처리하는 함수
//type은 GET_POSTS,GET_POST갑ㅌ은 문자열 타입
//promiseCreator는 특정 파라미터를 가져와서 프로미스로 만드는 함수
export const createPromiseThunk = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  //thunk를 만들어주는 함수
  return param => async dispatch => {
    //요청 시작
    dispatch({type});
    try {
      const payload = await promiseCreator(param);
      dispatch({
        type: SUCCESS,
        payload//결과값 posts또는 post
      })
    } catch (e) {
      dispatch({
        type: ERROR,
        payload: e,
        error: true,
      });
    }
  };
};

//리듀서 Utils라는 객체를 선언해주겠다.
export const reducerUtils = {
  //초기 상태를 간단하게 만들기 위한 Util함수
  initial: (data = null) => ({
    loading: false,
    data,
    error: null
  }),
  loading: (prevState = null) => ({
    loading: true,
    data: prevState,
    error: null,
  }),
  success: data => ({
    loading: false,
    data,
    error: null
  }),
  error: error => ({
    loading: false,
    data: null,
    error: error
  })
};


// 리듀서에 있는 힘수들을 더욱 간다하게 만드는 util함수
//key값은  post가 또는  posts가 될수도있고 더욱 많은 비동기 함수가 생성된다면 다른 값이 될수도있다.
export const handleAsyncActions = (type, key, keepData) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  //세가지 타입에 대한 리듀서를 만든다. 반환한다.
  return (state, action) => {
    //update
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: reducerUtils.loading(keepData ? state[key].data :null),
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