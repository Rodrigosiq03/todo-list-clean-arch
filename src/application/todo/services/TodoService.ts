import { Todo } from "../../../domain/entities/Todo";
import { TodoUseCase } from "../../../domain/usecases/TodoUseCase";
import { TodoRepository } from "../../../infra/repositories/TodoRepository";

export class TodoService implements TodoUseCase {
  private readonly repository: TodoRepository;

  constructor() {
    this.repository = new TodoRepository();
  };
  
  async getAllTodos(): Promise<Todo[]> {
    return this.repository.getAllTodos();
  };

  async addTodo(title: string): Promise<Todo> {
    return this.repository.addTodo(title);
  };

  async removeTodoById(id: string): Promise<void> {
    return this.repository.removeTodoById(id);
  };

};