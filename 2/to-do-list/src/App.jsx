import ToDoList from './components/ToDoList';
import "./App.css"
import {TodoListProvider} from './contexts/TodoListContext'
export default function App() {
  return (
    <TodoListProvider>
      <ToDoList/>
    </TodoListProvider>
  );
}

