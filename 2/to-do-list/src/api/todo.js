import api from './api'

// todo 생성
const addTodo = async ({ title,content,checked=false }) => {
  const { data } = await api.post('/', {
    title,
    content,
    checked,
  });
  return data;
};

// todo 조회
const fetchTodo = async ({title}) => {
  let url='';
  if(title){
    url += `?title=${title}`;
  }
  const { data } = await api.get(url);
  return data;
};

const fetchTodoById = async ({id}) => {
  const { data } = await api.get(`/${id}`);
  return data;
};

// todo 수정
const editTodo = async ({ id, title, content, checked }) => {
  const { data } = await api.patch(`/${id}`, {
    title,
    content,
    checked,
  });
  return data;
};

// todo 삭제
const deleteTodo = async (id) => {
  const { data } = await api.delete(`/${id}`);
  return data;
};

export {addTodo, fetchTodo, fetchTodoById, editTodo, deleteTodo}


