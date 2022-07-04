import { useRef, useState, useEffect } from 'react';
import { MrvlInput, MrvlForm, MrvlCheckbox } from 'stenciltest-react';

const Form = () => {
  const formRef = useRef();
  const [data, setData] = useState({});

  const handleInput = (e) => {
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(11, formRef.current);
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
