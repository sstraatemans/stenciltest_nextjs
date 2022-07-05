import type { NextPage } from 'next';
import { MrvlButton, MyComponent } from 'stenciltest-react';
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
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <div>
        <h2>Buttons</h2>
        <MrvlButton type='submit' size='small'>
          Small button
        </MrvlButton>{' '}
        <MrvlButton type='submit'>Medium button</MrvlButton>{' '}
        <MrvlButton type='submit' size='large'>
          Large button
        </MrvlButton>
      </div>
      <div>
        <h2>Outline buttons</h2>
        <MrvlButton type='submit' size='small' outline>
          Small button
        </MrvlButton>{' '}
        <MrvlButton type='submit' outline>
          Medium button
        </MrvlButton>{' '}
        <MrvlButton type='submit' size='large' outline>
          Large button
        </MrvlButton>
      </div>
    </div>
  );
};

export default Home;
