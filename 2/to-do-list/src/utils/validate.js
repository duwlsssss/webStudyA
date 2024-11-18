const MAX_TEXT_LENGTH = 30;

export const validateTodo=(values,options = {})=>{
  const {editMode} = options;
  const errors = { title: '', content: '' };

  if(values.title.length>MAX_TEXT_LENGTH){
    errors.title = `제목은 ${MAX_TEXT_LENGTH}자 이하로 적어주세요.`;
  }
  if(values.content.length > MAX_TEXT_LENGTH){
    errors.content = `내용은 ${MAX_TEXT_LENGTH}자 이하로 적어주세요.`;
  }

  if(!editMode){
    if(!values.title || values.title.trim() === ""){ 
      errors.title = '제목을 반드시 입력해 주세요.'; 
    }
    if(!values.content || values.content.trim() === ""){ 
      errors.content = '내용을 반드시 입력해 주세요.'; 
    }
  }

  return errors;
}