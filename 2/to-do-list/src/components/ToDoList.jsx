import { useState, useEffect, useMemo, useCallback} from "react"
import Button from "./Button"
import Input from "./Input"
import styled from 'styled-components'
import { useQuery, } from '@tanstack/react-query'
import {useAddTodo, useEditTodo, useDeleteTodo} from '../hooks/useTodo'
import { fetchTodo } from "../api/todo"
import useDebounce from "../hooks/useDebounce"
import { useNavigate } from "react-router-dom"
import useForm from '../hooks/useForm'
import { validateTodo } from "../utils/validate"

const StyledContainer = styled.div`

  header {
    font-weight: bold;
    font-size: 2rem;
    margin-bottom: 3rem;
  }
  
  .search-input{
    border: 0.5px solid #999;
    width: 80%;
  }


  .add-form{
    border-radius: 1rem;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: center; 
    padding: 1rem;
    margin: 2rem auto;
  }

  .add-form-inner{
    flex: 1;
  }

  .add-form-inner .input.error {
    border: 1px solid red;
  }
  
  .error-message-add{
    color: red;
    margin: 3px 0 -12px 5px;
    text-align: start;
    font-size: 0.6rem;
  }

  .todo-list {
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .todo-item{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem 0.8rem 1rem 1rem;
    font-size: 1.2rem;
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

  .todo-content{
    margin-top: 0.3rem;
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


const ToDoList = () => {
  const navigate = useNavigate();

  const [editId, setEditId] = useState(null); // 수정할 Todo의 ID
  const [searchValue, setSearchValue] =useState('');
  const debouncedSearchValue = useDebounce(searchValue,500); //200ms로 설정된 debounce

  const { data: todos, isLoading, error } = useQuery({
    queryFn: () => fetchTodo({title: debouncedSearchValue}),
    queryKey: ['todos', debouncedSearchValue]
  });

  const addTodo = useAddTodo();
  const editTodo = useEditTodo();
  const deleteTodo = useDeleteTodo();

  const stableValidateOptionsAdd = useMemo(() => ({ editMode: false }), []);
  const stableValidateOptionsEdit = useMemo(() => ({ editMode: true }), []);
  const stableValidateTodo = useCallback(validateTodo, []);

  const todoAdd = useForm({
    initialValue: {title: '', content: ''},
    validate: stableValidateTodo,
    validateOptions: stableValidateOptionsAdd,  
  });

  const todoEdit = useForm({
    initialValue: {title: '', content: ''},
    validate: stableValidateTodo,
    validateOptions: stableValidateOptionsEdit,  
  });

  if (isLoading) return <div>로딩중</div>;
  if (error) return <div>에러 발생</div>;

  const handleAddTodo = (e) => {
    e.preventDefault();

    addTodo.mutate(
      todoAdd.values,
      {
        onSuccess: () => {
          alert("추가되었습니다!");
          todoAdd.setValues({ title: '', content: '' });
        },
      }
    );
  };

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

  return (
    <StyledContainer>
      <header>TODO LIST</header>
      <Input 
        className="search-input"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="검색할 제목을 입력하세요"
      />
      <form className="add-form" onSubmit={handleAddTodo}>
        <div className="add-form-inner">
          <Input
            className={`input ${todoAdd.touched.title && todoAdd.errors.title ? 'error' : ''}`}
            placeholder="제목을 입력하세요"
            {...todoAdd.getTextInputProps('title')}
          />
          {todoAdd.touched.title && todoAdd.errors.title && <p className='error-message-add'>{todoAdd.errors.title}</p>}
        </div>
        <div className="add-form-inner">
          <Input
             className={`input ${todoAdd.touched.content && todoAdd.errors.content ? 'error' : ''}`}
            placeholder="내용을 입력하세요"
            {...todoAdd.getTextInputProps('content')}
          />
          {todoAdd.touched.content && todoAdd.errors.content && <p className='error-message-add'>{todoAdd.errors.content}</p>}
        </div>
        <Button
          text="+"
          disabled={todoAdd.errors.title||todoAdd.errors.content}
        />
      </form>
      <ul className="todo-list">
        {todos[0].map((todo) => (
          <li className="todo-item" key={todo.id}>
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
                    <p>{todo.title}</p>
                    <p className="todo-content">{todo.content}</p>
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
                  <Button text="상세보기" onClick={() => navigate(`/todo/${todo.id}`)}/>
                  <Button text="삭제" onClick={() =>{deleteTodo.mutate(todo.id); alert("삭제되었습니다!");}}/>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </StyledContainer>
  );
}

export default ToDoList;