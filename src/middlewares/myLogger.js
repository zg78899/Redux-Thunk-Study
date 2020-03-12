//미들웨어함수
const myLogger =store=>next=>action=>{
console.log(action);
console.log('\tPrev',store.getState());
const result = next(action);//action을 다른 미들웨어테 넘기고다른 미들웨어가 없다면리듀서에게 넘긴다.
console.log('\tNext',store.getState());//action이 reducer에서 처리가 되고난 다음의 상태를 확인하겠다.
return result;//여기서의 반환하는 result는 CounterContainer에서 액션을 dispatch하는 결과를 반환한다.
}

export default myLogger;
//만든 미들웨어 함수를 스토어에 적용을 한다.