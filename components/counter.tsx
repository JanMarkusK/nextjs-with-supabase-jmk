import { useState,  } from 'react';
import { Button } from './ui/button';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <Button onClick={() => setCount(count + 1)}>+1</Button>
      <Button onClick={() => setCount(count - 1)}>-1</Button>
    </div>
  );
}

export default Counter;