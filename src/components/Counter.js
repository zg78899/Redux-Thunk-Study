//프리젠테이션 컴포넌트를 생성하자
import React from 'react';

function Counter({number,onIncrease,onDecrease}) {
  return (
    <div>
      <p>{number}</p>
      <button onClick={onIncrease}>+</button>
      <button onClick={onDecrease}>-</button>
    </div>
  );
}
export default Counter;