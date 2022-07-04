import { useRef, useState, useEffect } from 'react';
import { MrvlInput, MrvlForm, MrvlCheckbox } from 'stenciltest-react';

var serializeForm = function (formData) {
  var obj = {};
  for (var key of formData.keys()) {
    obj[key] = formData.get(key);
  }
  return obj;
};

const Form = () => {
  const formRef = useRef();
  const [data, setData] = useState({});

  const handleInput = (e) => {
    console.log(e.target.value);
  };

  useEffect(() => {
    const listener = (formData) => {
      setData(serializeForm(formData.formData));
    };

    formRef.current?.addEventListener('formdata', listener);

    return () => formRef.current?.removeEventListener('formdata', listener);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current?.querySelector('form'));

    setData(serializeForm(formData));
  };

  return (
    <MrvlForm ref={formRef} onSubmit={handleSubmit}>
      <MrvlInput name='damn' label='labeltest' onInput={handleInput} />
      <MrvlCheckbox name='check' label='checkbox' onInput={handleInput} />
      <button>submit</button>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </MrvlForm>
  );
};

export default Form;
