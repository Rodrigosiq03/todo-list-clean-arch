import { Todo } from "../../../domain/entities/Todo";
import { TTodo } from "../../../types/Todo";

export class TodoPresenter {
  static present(todo: Todo): TTodo {
    return {
      id: todo.id,
      title: todo.title,
      completed: todo.completed
    }
  }

  static presentAll(todos: Todo[]): TTodo[] {
    return todos.map(TodoPresenter.present)
  }
}