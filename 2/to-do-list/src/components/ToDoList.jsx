import { useState, useEffect } from "react";
import Button from "./Button";
import Input from "./Input";

const MAX_TODO_LENGTH = 30;

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  const [editId, setEditId] = useState(null); // 수정 모드에 있는 항목의 인덱스
  const [editValue, setEditValue] = useState(''); // 수정할 새 값

  // 입력항목 유효성 검사 후 작업 수행
  const handleInput = (value, action) => {
    if (value.length > MAX_TODO_LENGTH) {
      alert(`할 일은 최대 ${MAX_TODO_LENGTH}자로 입력해주세요`);
      return;
    }
    if (!value.trim()) {
      alert(`할 일을 입력해주세요`);
      return;
    }
    action();
  };

  //추가하기
  const handleAddTodo = () => {
    handleInput(text, () => {
      setTodos(prev => [
        ...prev,
        { id: Math.floor(Math.random() * 100) + 1, task: text }
      ]);
      setText('');
    });
  };

  // 삭제하기
  const handleDeleteTodo = (id) => {
    setTodos(prev=>prev.filter((item)=> item.id !== id));
  };

  // 수정하기
  const handleEditTodo = (id, text) => {
    handleInput(text, () => {
      setTodos(prev=>
        prev.map(todo=>
          todo.id===id?{...todo, task:text} : todo
        )
      ); 
      setEditId(null);  // 수정 모드 종료
      setEditValue(''); // 입력 필드 초기화
    });
  }

  // todos 바뀌는 거 확인
  // useEffect(() => {
  //   console.log('todos changed',todos);
  // },[todos]);


  return (
    <div className="container">
      <header>TODO LIST</header>
        <div className="input-bar">
          <Input
            className="input todo"
            value={text}
            onChange={e=>setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                handleAddTodo();
            }}}
            placeholder="할 일을 입력해주세요!"
          />
          <Button className="btn add" text='+' onClick={handleAddTodo}/>
        </div>
      <ul className="todo-list">
        {todos.map((todo, _) => (
          <li className="todo-item" key={todo.id}>
            {editId === todo.id ? (
              <>
                <div className="title">
                  {editId}. 
                  <Input
                    className="input edit"
                    value={editValue}
                    onChange={e=>setEditValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                        handleEditTodo(editId,editValue)
                      }
                    }}
                    placeholder="새로운 값을 입력해주세요!"
                  />
                </div>
                <div className="btn-container">
                    <Button className="btn" text='삭제' onClick={() => handleDeleteTodo(todo.id)}/>
                    <Button className="btn" text='완료' onClick={() => handleEditTodo(editId,editValue)}/>
                </div>
              </>
            ) : (
              <>
                <div className="title">{todo.id}. {todo.task}</div>
                <div className="btn-container">
                  <Button className="btn" text='삭제' onClick={() => handleDeleteTodo(todo.id)}/>
                  <Button className="btn" text='수정' onClick={() => setEditId(todo.id)}/>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;