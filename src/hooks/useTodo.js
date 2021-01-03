import { useState, useEffect } from "react";

import todoService from "../services/todos";

export default function useTodo() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    todoService.getAll().then((todos) => {
      setTodos(todos.reverse());
    });
  }, []);

  const toggleTodo = (id, completed) => {
    const todo = todos.find((todo) => todo.id === id);
    const newTodo = { ...todo, completed: !completed };

    todoService.update(id, newTodo).then((updateTodo) => {
      const newTodos = todos.map((todo) => (todo.id !== updateTodo.id ? todo : updateTodo));
      setTodos(newTodos);
    });
  };

  const deleteTodo = (id) => {
    todoService.delete(id).then((deleteTodoId) => {
      const newTodos = todos.filter((todo) => todo.id !== deleteTodoId);
      setTodos(newTodos);
    });
  };

  return { todos, toggleTodo, deleteTodo };
}
