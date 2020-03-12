// 액션 타입
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

//액션 creator
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });


//thunk 함수
export const increaseAsync =()=>(dispatch)=>{
 setTimeout(()=>{
 dispatch(increase());
 },1000)
}

// (dispatch)=>{
//   setTimeout(()=>{
//   dispatch(increase());
//   },1000)
//  } 
//이만큼만 thunk 함수이다.나머지는 thunk함수를 만들어주는 함수
export const decreaseAsync =()=>(dispatch)=>{
 setTimeout(()=>{
 dispatch(decrease());
 },1000)
}

//-----------이후에 CounterContaier에서 블어와서 dispatch을 한다.

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

//특정 thunk함수가 dispatch하면은 1초 후에 dispatch을 하는 (increase,decrease);
//thunk함수는 나중에 countainer에서 불러와서 사용해야한다.