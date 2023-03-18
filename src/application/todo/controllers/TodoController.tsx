import { useEffect, useMemo, useState } from 'react';
import { TTodo } from '../../../types/Todo';
import { TodoPresenter } from '../presenters/TodoPresenter';
import { TodoService } from '../services/TodoService';

export function TodoController() {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState<string>("");
  console.log("Todo title: ", newTodoTitle);
  const service = useMemo(() => new TodoService(), []);

  
  //load data from local storage or API
  useEffect(() => {
    async function fetchTodos() {
      const allTodos = await service.getAllTodos();
      const presentedTodos = TodoPresenter.presentAll(allTodos);
      setTodos(presentedTodos);
    };
    fetchTodos();
    
  }, [service]);

  async function handleAddTodo() {
    const newTodo = await service.addTodo(newTodoTitle)
    setTodos([...todos, newTodo]);
    setNewTodoTitle("");
  }

  async function handleRemoveTodo(id: string) {
    await service.removeTodoById(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <div>
      <h1>Todo list</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{textDecoration: todo.completed ? "line-through" : ""}}>
              {todo.title}
            </span>
            <button onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <div>
        <input type={"text"} value={newTodoTitle} onChange={(event) => setNewTodoTitle(event.target.value)} />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
    </div>
  )
};