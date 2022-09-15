import { useRef, useState } from 'react';
import { MrvlInput, MrvlCheckbox, MrvlButton, MrvlCard } from 'stenciltest-react';

const Form = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [data, setData] = useState({});

  const handleInput = (e: any) => {
    console.log(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!formRef.current) return;
    const formData = new FormData(formRef.current);

    setData([...formData]);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <MrvlCard>
        <span slot='body'>
          <MrvlInput name='damn' label='labeltest' onInput={handleInput} />
          <MrvlCheckbox name='check' label='checkbox' onInput={handleInput} />
        </span>
        <span slot='actions'>
          <button type='submit'>submit!</button>
        </span>
      </MrvlCard>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </form>
  );
};

export default Form;
