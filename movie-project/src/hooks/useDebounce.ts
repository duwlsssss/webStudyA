import { useEffect, useState } from 'react';

const useDebounce = (value: string, delay:number) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setDebouncedValue(value); //delay 시간 후에 실행됨
    },delay);

    return () => {clearTimeout(timer)}; //delay 시간 동안은 타이머 초기화(value 변경 시점에)

  },[value]);

  return debouncedValue;
}

export default useDebounce;