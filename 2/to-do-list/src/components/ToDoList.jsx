import { useState, useEffect } from "react";
import Button from "./Button";
import Input from "./Input";
import { useTodoListValue, useTodoListActions } from "../contexts/TodoListContext";

const ToDoList = () => {

  const todos = useTodoListValue();
  const {addTodo, editTodo, deleteTodo, deleteAll} = useTodoListActions();

  const [task, setTask] = useState('');
  const [editId, setEditId] = useState(null); // 수정 모드에 있는 항목의 인덱스
  const [editValue, setEditValue] = useState(''); // 수정할 새 값

  // todos 바뀌는 거 확인
  // useEffect(() => {
  //   console.log('todos changed',todos);
  // },[todos]);

  const handleAddToDo = () => {
    addTodo(task)
    setTask(''); // 입력값 없앰
  }

  const handleEditTodo = (id, newTask) => {
    editTodo(id, newTask);
    setEditId(null); 
    setEditValue(''); // 수정 모드 초기화, 수정 값 없앰
  }

  return (
    <div className="container">
      <header>TODO LIST</header>
        <div className="input-bar">
          <Input
            className="input todo"
            value={task}
            onChange={e=>setTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                handleAddToDo();
            }}}
            placeholder="할 일을 입력해주세요!"
          />
          <Button className="btn add" text='+' onClick={handleAddToDo}/>
          <Button className='btn deleteAll' text='모두 삭제' onClick={()=>deleteAll()}/>
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
                        handleEditTodo(editId, editValue);
                      }
                    }}
                    placeholder="새로운 값을 입력해주세요!"
                  />
                </div>
                <div className="btn-container">
                    <Button className="btn" text='삭제' onClick={() => deleteTodo(todo.id)}/>
                    <Button className="btn" text='완료' onClick={() => handleEditTodo(editId,editValue)}/>
                </div>
              </>
            ) : (
              <>
                <div className="title">{todo.id}. {todo.task}</div>
                <div className="btn-container">
                  <Button className="btn" text='삭제' onClick={() => deleteTodo(todo.id)}/>
                  <Button 
                    className="btn" 
                    text='수정' 
                    onClick={() => {
                      setEditId(todo.id)
                      setEditValue(todo.task)
                    }
                  }/>
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