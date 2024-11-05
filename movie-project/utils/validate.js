const emailPattern = /^\S+@\S+\.\S+$/;
const passwordPattern = /.{8,16}/;

const validateInput=(values)=>{
  const errors=({email:'', password:'', passwordCheck:''});

  // 이메일 유효성 검사
  if(!values.email){ 
    errors.email = '이메일을 반드시 입력해 주세요.'; 
  } else if(!emailPattern.test(values.email)){
    errors.email = '이메일 형식에 맞지 않습니다.';
  }
  
  // 비번 유효성 검사
  if(!values.password){ 
    errors.password = '비밀번호를 반드시 입력해 주세요.'; 
  }else if(!passwordPattern.test(values.password)){
    errors.password = '비밀번호는 8~16자로 입력해주세요.';
  }

  // 비번 같은 검사
  if(!values.passwordCheck){ 
    errors.passwordCheck = '비밀번호를 반드시 다시 입력해 주세요.'; 
  }else if(values.password!==values.passwordCheck){
    errors.passwordCheck = '비밀번호가 같지 않습니다.';
  }

  return errors;
}

export const validateLogin=(values)=>{
  return validateInput(values);
}