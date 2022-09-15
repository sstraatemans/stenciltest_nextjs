import type { NextPage } from 'next';
import { MrvlButton, MyComponent, MrvlCard, MrvlTypography } from 'stenciltest-react';
import { useState, useEffect, useRef } from 'react';
import Form from '../components/Form';

const Home: NextPage = () => {
  const [count, setCount] = useState(1);
  const ref = useRef<any | null>(null);

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
      <button onClick={() => console.log(23)}>add</button>
      <MrvlCard>
        dd serverside rendering
        <span slot='body'>
          <MyComponent
            ref={ref}
            onTodoCompleted={(ev: any) => console.log('do with a function', ev.detail)}
            count={count}
          />
          <div>{count}</div>
        </span>
        <span slot='actions'>
          <button onClick={() => setCount((v) => v + 1)}>add</button>
        </span>
      </MrvlCard>

      <div>
        <h2>Forms</h2>
        <Form />
      </div>

      <div>
        <h2>Outline buttons</h2>
        <MrvlButton type='submit' size='small' outline>
          Small button
        </MrvlButton>
        <MrvlButton type='submit'>Medium button</MrvlButton>
        <MrvlButton type='submit' size='large' outline>
          Large button
        </MrvlButton>
      </div>
      <div>
        <h2>Typography</h2>
        <MrvlTypography>test text</MrvlTypography>
      </div>
      <div>
        <h2>Composed components</h2>
        <MrvlCard>
          <div slot='body'>test</div>
          <p slot='actions'>
            <MrvlButton type='submit' outline>
              Medium button
            </MrvlButton>
          </p>
        </MrvlCard>
      </div>
    </div>
  );
};

export default Home;
