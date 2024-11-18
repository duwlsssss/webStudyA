import {useState, useMemo, useCallback} from 'react'
import styled from 'styled-components'
import { useParams, useNavigate } from "react-router-dom"
import { useEditTodo, useDeleteTodo } from "../hooks/useTodo"
import {fetchTodoById} from '../api/todo'
import {useQuery} from'@tanstack/react-query'
import Input from "./Input"
import Button from "./Button"
import useForm from '../hooks/useForm'
import { validateTodo } from "../utils/validate"

const StyledContainer = styled.div`

  .prev-btn{
    position: fixed;
    top: 20px;
    left: 30px;
    font-size: 2rem;
    border: none;
    background-color: #fff;
  }

  header {
    font-weight: bold;
    font-size: 2rem;
    margin-bottom: 3rem;
  }

  .todo-item{
    display: flex;
    flex-direction: column;
    gap:0.5rem;
    padding: 1rem;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    height: 150px; 
  }

  .todo-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem; 
  }

  .todo-inner {
    text-align: start;
  }

  .todo-title{
    font-weight: bold;
    font-size: 1.5rem;
  }

  .todo-content{
    margin: 0.4rem 0;
    font-size: 1rem;
  }

  .todo-updateAt{
    font-size: 0.8rem;
  }

  .edit-input .input{
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    border: 1px solid #999;
  }

  .edit-input .input.error{
    border: 1px solid red;
  }

  .btn-container {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }

  .error-message{
    color: red;
    margin: -5px 0 5px 5px;
    text-align: start;
    font-size: 0.8rem;
  }
`;

const ToDoDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [editId, setEditId] = useState(null); // 수정할 Todo의 ID

  const { data: todo, isLoading, error } = useQuery({
    queryFn: () => fetchTodoById({id}),
    queryKey: ['todo', id],
    enabled: !!id,
  });

  const editTodo = useEditTodo();
  const deleteTodo = useDeleteTodo();

  const stableValidateOptionsEdit = useMemo(() => ({ editMode: true }), []);
  const stableValidateTodo = useCallback(validateTodo, []);

  const todoEdit = useForm({
    initialValue: {title: '', content: ''},
    validate: stableValidateTodo,
    validateOptions: stableValidateOptionsEdit,  
  });

  if (isLoading) return <div>로딩중</div>;
  if (error) return <div>에러 발생</div>;

  const handleEditTodo = (e) => {
    e.preventDefault();

    editTodo.mutate(
      { id: editId, ...todoEdit.values },
      {
        onSuccess: () => {
          alert("수정되었습니다!");
          setEditId(null);
          todoEdit.setValues({ title: '', content: '' });
        },
      }
    );
  };

  const handleDeleteTodo = () => {
    deleteTodo.mutate(id, {
      onSuccess: () => {
        alert("삭제되었습니다!");
        navigate("/"); // 삭제 후 메인 페이지로 이동
      },
    });
  };

  return (
    <StyledContainer>
      <Button className="prev-btn" text="<" onClick={() => navigate("/")} />
      <header>할 일 상세보기</header>
      <div className="todo-item">
        {editId === todo.id ? (
          <form className="edit-form" onSubmit={handleEditTodo}>
            <div className="edit-input">
              <Input
                className={`input ${todoEdit.touched.title && todoEdit.errors.title ? 'error' : ''}`}
                {...todoEdit.getTextInputProps('title')}
                placeholder="새 제목"
              />
              {todoEdit.touched.title && todoEdit.errors.title && <p className='error-message'>{todoEdit.errors.title}</p>}
              <Input
                className={`input ${todoEdit.touched.content && todoEdit.errors.content ? 'error' : ''}`}
                {...todoEdit.getTextInputProps('content')}
                placeholder="새 내용"
              />
              {todoEdit.touched.content && todoEdit.errors.content && <p className='error-message'>{todoEdit.errors.content}</p>}
            </div>
            <div className="btn-container">
              <Button 
                className="btn" 
                text='완료'
                disabled={todoEdit.errors.title || todoEdit.errors.content}
              />
              <Button
                className="btn"
                text="취소"
                onClick={() => {
                  setEditId(null);
                  todoEdit.setValues({ title: '', content: '' });
                }}
              />
            </div>
          </form>
        ) : (
          <>
            <div className="todo-container">
              <input type='checkbox' defaultChecked={todo.checked} 
                onChange={() =>
                  editTodo.mutate({ id: todo.id, checked: !todo.checked})
                }
              />
              <div className="todo-inner">
                <p className="todo-title">{todo.title}</p>
                <p className="todo-content">{todo.content}</p>
                <p className="todo-updateAt">수정일: {new Date(todo.updatedAt).toISOString().slice(0, 10)}</p>
              </div>
            </div>
            <div className="btn-container">
              <Button
                text="수정"
                onClick={() => {
                  setEditId(todo.id);
                  todoEdit.setValues({ title: todo.title, content: todo.content });
                }}
              />
              <Button text="삭제" onClick={handleDeleteTodo}/>
            </div>
          </>
        )}
      </div>
    </StyledContainer>
  );
};

export default ToDoDetails;