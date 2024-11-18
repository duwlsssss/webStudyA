import {useEffect, useState} from 'react';

const useForm = ({initialValue, validate, validateOptions = {}}) => {

  const [values, setValues] = useState(initialValue);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  const handleChangeInput = (key,value) => {
    setValues({
      ...values,
      [key]: value
    })
  };
  
  const handleBlur = (key) => {
    setTouched({
      ...touched,
      [key]: true
    })
  };

  const getTextInputProps = (key) => {
    const value = values[key];
    const onChange = (e) => handleChangeInput(key, e.target.value);
    const onBlur = () => handleBlur(key);

    return {value, onChange, onBlur}
  }

  useEffect(() => {
    const newErrors = validate(values, validateOptions);
    setErrors(newErrors);
  }, [values, validate, validateOptions]);

  // useEffect(() => {
  //   console.log(touched);
  // }, [touched]);

  // useEffect(() => {
  //   console.log(errors);
  // }, [errors]);

  return { values, setValues, touched, errors, getTextInputProps }
};

export default useForm;
