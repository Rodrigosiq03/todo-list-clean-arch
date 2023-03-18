import { Todo } from "../../domain/entities/Todo";
import { TodoUseCase } from "../../domain/usecases/TodoUseCase";

export class TodoRepository implements TodoUseCase {
  private readonly storageKey = "todos";
  
  private getAllTodosFromStorage(): Todo[] {
    const todos = localStorage.getItem(this.storageKey);
    return todos ? JSON.parse(todos) as Todo[] : [];
  }
  
  private saveAllTodosToStorage(todos: Todo[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(todos));
  }
  
  async getAllTodos(): Promise<Todo[]> {
    return this.getAllTodosFromStorage();
  }

  async addTodo(title: string): Promise<Todo> {
    const todo: Todo = {
      id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      title,
      completed: false,
      createdAt: new Date()
    };
    const todos = this.getAllTodosFromStorage();
    todos.push(todo);
    this.saveAllTodosToStorage(todos);
    return todo;
  }

  async removeTodoById(id: string): Promise<void> {
    const todos = this.getAllTodosFromStorage();
    const newTodos = todos.filter(todo => todo.id !== id);
    this.saveAllTodosToStorage(newTodos);
  }

}