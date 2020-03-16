//함수의 흐름을 특정 구간에 멈춰 놓앗다가 다시 실행할수있다.
//결과값을 여러번 내보낼 수 있다.
function* generator(){
  console.log('hihi');
  yield 1;
  console.log('제너레이터 함수');
  yield 2;
  console.log('function *');
  yield 3;
  console.log('yield');
  return 4; 
}
const gfunction=generator();
console.log(gfunction.next().value);
//멈출때는 yield를 사용하고 계속해서 다음 함수를 사용할때는 next을 사용한다.
//generator는 value와done이라는 값을 가지고 있으며 done은 불리언 generator가 끝이 나지않았다면 false 끝이 났다면 true이다.
//next() generator 함수가 다음으로 실행이 된다.


function* sum(){
  console.log('sum이 실행 되었습니다');
  let a = yield;
  console.log('a 실행 되었습니다');
  let b=yield;
  console.log('b 실행되었습니다.');
  return a+b;
}

