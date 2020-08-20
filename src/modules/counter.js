import {delay,put,takeEvery,takeLatest,takeLeading} from 'redux-saga/effects';
// takeLeading은 가장 처음에 들어오는 dispatch을 실행하고 다 끝난다음에 다음에서 가장 먼저들어온 dispatch을 실행한다.
//delay는 특정 시간을 기다려라/put은 특정 행위를 dispatch해라 명령.
//takeLatest

// 액션 타입
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

const INCREASE_ASYNC='INCREASE_ASYNC';
const DECREASE_ASYNC='DECREASE_ASYNC';
//액션 creator
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
//redux-saga
// thunk로 처리했었던 것을 순수한 객체로 액션 생성함수를 만듬
export const increaseAsync=()=>({type:INCREASE_ASYNC});
export const decreaseAsync=()=>({type:DECREASE_ASYNC})
//다음 사가를 만듬

function* increaseSaga(){
yield delay(1000);
// increase을 호출해서 increase 액션 객체를 만들고 그 액션을 diapatch을 해라,redux-saga미들웨어에 명령을 한다.
yield put(increase());
}

function* decreaseSaga(){
  yield delay(1000);
  yield put( decrease());
}

export function* counterSaga(){
  //INCREASE_ASYNC액션이 dispatch되면 increaseSaga을 실행
  yield takeEvery(INCREASE_ASYNC,increaseSaga);
  //가장 마지막에 들어오는 dispatch만 saga함수만 실행을 한다.
  yield takeLatest(DECREASE_ASYNC,decreaseSaga);
}


//thunk 함수
// export const increaseAsync =()=>(dispatch)=>{
//  setTimeout(()=>{
//  dispatch(increase());
//  },1000)
// }

// (dispatch)=>{
//   setTimeout(()=>{
//   dispatch(increase());
//   },1000)
//  } 

//이만큼만 thunk 함수이다.나머지는 thunk함수를 만들어주는 함수
// export const decreaseAsync =()=>(dispatch)=>{
//  setTimeout(()=>{
//  dispatch(decrease());
//  },1000)
// }

//-----------이후에 CounterContaier에서 블어와서 dispatch을 한다.
//thunk함수를 사용해서 액션이 dispatch되는 시점을 딜레이 시켜보았다.
//thunk함수는 api을 요청할때 혹은 특정 프로미스를 다룰때 유용하게 사용할수있다.

//초기값
const initialState = 0;
//초기값은 항상 객체이거나,배열이거나 할 필요는 없다. 문자열이 될수도 숫자가 될수있다.

//리듀서
export default function counter(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return state + 1;
    case DECREASE:
      return state - 1;
    default:
      return state;
  }
}
//---------counter라는 리덕스의 모듈을 만들었다.

//이후의 루트 리듀서를 만들자

//특정 ㅁ함수가 dispatch하면은 1초 후에 dispatch을 하는 (increase,decrease);
//thunk함수는 나중에 countainer에서 불러와서 사용해야한다.