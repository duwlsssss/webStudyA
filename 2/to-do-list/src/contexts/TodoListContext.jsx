import React, { useState, useMemo, useRef, createContext, useContext, useCallback } from 'react';
const TodoListValueContext = createContext();
const TodoListActionsContext = createContext();

const TodoListProvider = ({ children }) => {
  const idRef = useRef(3);
  const [todos, setTodos] = useState([
    { id: 1, task: '코드 리뷰하기' },
    { id: 2, task: '방 청소하기' },
  ]);

  const MAX_TASK_LENGTH = 30;

  // useCallback으로 handleInput이 ToDoListProvider가 리렌더링때마다 새로 만들어지는 거 막음
  // useCallback 안 쓰면 handleInput 사용하는 컴포넌트에서 매번 새로 handleInput이 생성되고 context의 값이 변경된 것으로 간주해 낭비 렌더링 발생함 
  const handleInput = useCallback((task, action) => {
    if (!task.trim()) {
      alert(`할 일을 입력해주세요`);
      return;
    }
    if (task.length > MAX_TASK_LENGTH) {
      alert(`할 일은 최대 ${MAX_TASK_LENGTH}자로 입력해주세요`);
      return;
    }
    action();
  },[]);

  // useMemo로 actions 객체 안에 정의된 함수들이 재생성되지 않게 함
  const actions = useMemo(()=>({
    addTodo(task){
      handleInput(task,()=>{
        const id = idRef.current++;
        setTodos(prev=>[...prev, {id, task}]);
        alert('할 일이 추가되었습니다.');
      });
    },
    editTodo(id, newTask) {
      handleInput(newTask,()=>{
        setTodos(prev =>
          prev.map(todo =>
            todo.id === id ? { ...todo, task: newTask} : todo
          )
        );
        alert('할 일이 수정되었습니다.');
      });
    },
    deleteTodo(id){
      setTodos(prev=>prev.filter(todo=>todo.id!==id));
      alert('할 일이 삭제되었습니다.');
    },
    deleteAll(){
      if(todos.length===0){alert('할 일이 없습니다.');}
      else{
        setTodos([]);
        alert('모든 할 일이 삭제되었습니다.');
      }
    },
  }),[handleInput]); //handleInput이 변하지 않으면, actions 안 함수들이 재생성되지 않고 기존에 메모이제이션된 함수를 그대로 사용함

  return (
    <TodoListActionsContext.Provider value={actions}>
      <TodoListValueContext.Provider value={todos}>
        {children}
      </TodoListValueContext.Provider>
    </TodoListActionsContext.Provider>
  );
};

function useTodoListValue() {
  const value = useContext(TodoListValueContext);
  // Provider 컴포넌트로 감싸지 않았을때
  if (value === undefined) {
    throw new Error('useExpensesValue should be used within MyContext.Provider');
  }
  return value;
}

function useTodoListActions() {
  const value = useContext(TodoListActionsContext);
  // Provider 컴포넌트로 감싸지 않았을때
  if (value === undefined) {
    throw new Error('useExpensesActions should be used within MyContext.Provider');
  }
  return value;
}

export {TodoListProvider,useTodoListValue,useTodoListActions};
