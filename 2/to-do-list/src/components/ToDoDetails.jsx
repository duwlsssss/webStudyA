import {useState} from 'react'
import styled from 'styled-components'
import { useParams, useNavigate } from "react-router-dom"
import { useEditTodo, useDeleteTodo } from "../hooks/useTodo"
import {fetchTodoById} from '../api/todo'
import {useQuery} from'@tanstack/react-query'
import Input from "./Input"
import Button from "./Button"

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

const ToDoDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [editId, setEditId] = useState(null); // 수정할 Todo의 ID
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const { data: todo, isLoading, error } = useQuery({
    queryFn: () => fetchTodoById({id}),
    queryKey: ['todo', id],
    enabled: !!id,
  });

  const editTodo = useEditTodo();
  const deleteTodo = useDeleteTodo();

  if (isLoading) return <div>로딩중</div>;
  if (error) return <div>에러 발생</div>;

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
                  setEditTitle(todo.title);
                  setEditContent(todo.content);
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