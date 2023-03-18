import { Todo } from "../entities/Todo";

export interface TodoUseCase {
  getAllTodos(): Promise<Todo[]>;
  addTodo(title: string): Promise<Todo>;
  removeTodoById(id: string): Promise<void>;
}