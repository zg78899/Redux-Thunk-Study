//미들웨어함수(myLogger 미들웨어 함수)
const myLogger =store=>next=>action=>{
  console.log(action);
  console.log('\tPrev',store.getState());
  const result = next(action);//action을 다른 미들웨어에 넘기고 다른 미들웨어가 없다면리듀서에게 넘긴다.
  //next(action)을 했을때 다음 미들웨어를 실행했다.
  console.log('\tNext',store.getState());//action이 reducer에서 처리가 되고난 다음의 상태를 확인하겠다.
  return result;//여기서의 반환하는 result는 CounterContainer에서 액션을 dispatch하는 결과를 반환한다.
}

export default myLogger;
//만든 미들웨어 함수를 스토어에 적용을 한다.
//redux-logger을 통해서 myLogger을 대체한다.
