import React, {useEffect, useState} from 'react';

const useForm = ({initialValue, validate}) => {

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

  useEffect(()=>{
    const newErrors = validate(values);
    setErrors(newErrors);
  },[validate, values]);

  return {values, touched, errors, getTextInputProps}
}

export default useForm;


