import { useEffect, useState } from 'react';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay); //delay 시간 후까지 입력 없으면 그때 로직 실행됨

    return () => {
      clearTimeout(timer);
    }; //value 변경 시점에 clearTimeout을 해줌
  }, [value]);

  return debouncedValue;
};

export default useDebounce;