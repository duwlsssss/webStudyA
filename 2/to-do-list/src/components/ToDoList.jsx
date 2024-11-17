import { useState, useEffect } from "react"
import Button from "./Button"
import Input from "./Input"
import styled from 'styled-components'
import { useQuery, } from '@tanstack/react-query';
import {useAddTodo, useEditTodo, useDeleteTodo} from '../hooks/useTodo'
import { fetchTodo } from "../api/todo";
import useDebounce from "../hooks/useDebounce";
import { useNavigate } from "react-router-dom";

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
    justify-content: space-around;
    align-items: center; 
    padding: 1rem;
    margin: 2rem auto;
  }

  .add-form input{
    width: 46%;
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

  .edit-input input{
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    border: 1px solid #999;
  }

  .btn-container {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }
`;


const ToDoList = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null); // 수정할 Todo의 ID
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [searchValue, setSearchValue] =useState('');
  const debouncedSearchValue = useDebounce(searchValue,500); //200ms로 설정된 debounce

  const { data: todos, isLoading, error } = useQuery({
    queryFn: () => fetchTodo({title: debouncedSearchValue}),
    queryKey: ['todos', debouncedSearchValue]
  });
  const addTodo = useAddTodo();
  const editTodo = useEditTodo();
  const deleteTodo = useDeleteTodo();

  if (isLoading) return <div>로딩중</div>;
  if (error) return <div>에러 발생</div>;

  const handleAddTodo = (e) => {
    e.preventDefault();

    addTodo.mutate(
      { title, content },
      {
        onSuccess: () => {
          alert("추가되었습니다!");
          setTitle("");
          setContent("");
        },
      }
    );
  };

  const handleEditTodo = (e) => {
    e.preventDefault();

    editTodo.mutate(
      { id: editId, title: editTitle, content: editContent },
      {
        onSuccess: () => {
          alert("수정되었습니다!");
          setEditId(null);
          setEditTitle("");
          setEditContent("");
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
        <Input
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
        />
        <Input
          className="input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력하세요"
        />
        <Button
          text="+"
          disabled={!title.trim() || !content.trim()}
        />
      </form>
      <ul className="todo-list">
        {todos[0].map((todo) => (
          <li className="todo-item" key={todo.id}>
            {editId === todo.id ? (
              <form className="edit-form" onSubmit={handleEditTodo}>
                <div className="edit-input">
                  <Input
                    className="input"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="새 제목"
                  />
                  <Input
                    className="input"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    placeholder="새 내용"
                  />
                </div>
                <div className="btn-container">
                  <Button 
                    className="btn" 
                    text='완료'
                  />
                  <Button
                    className="btn"
                    text="취소"
                    onClick={() => {
                      setEditId(null);
                      setEditTitle('');
                      setEditContent('');
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
                      setEditTitle(todo.title);
                      setEditContent(todo.content);
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