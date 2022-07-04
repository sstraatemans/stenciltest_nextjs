import type { NextPage } from 'next';
import { MrvlCheckbox, MyComponent } from 'stenciltest-react';
import { useState, useEffect, useRef } from 'react';
import Form from '../components/Form';

const Home: NextPage = () => {
  const [count, setCount] = useState(1);
  const ref = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const listener = (e: any) => {
      console.log(22, e.detail);
    };
    ref.current?.addEventListener('todoCompleted', listener);

    return () => {
      ref.current?.removeEventListener('todoCompleted', listener);
    };
  }, []);

  return (
    <div className='App'>
      dd serverside rendering
      <Form />
      <MyComponent
        ref={ref}
        onTodoCompleted={(ev) => console.log('do with a function', ev.detail)}
        count={count}
      />
      {count}
      <button onClick={() => setCount((v) => v + 1)}>add</button>
    </div>
  );
};

export default Home;
