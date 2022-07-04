import { useRef, useState } from 'react';
import { MrvlInput, MrvlCheckbox } from 'stenciltest-react';

const Form = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [data, setData] = useState({});

  const handleInput = (e: any) => {
    console.log(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log(11, formRef.current);
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);

    setData([...formData]);
  };

  return (
    <div>
      <form ref={formRef} onSubmit={handleSubmit}>
        <MrvlInput name='damn' label='labeltest' onInput={handleInput} />
        <MrvlCheckbox name='check' label='checkbox' onInput={handleInput} />
        <button type='submit'>submit</button>
      </form>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Form;
