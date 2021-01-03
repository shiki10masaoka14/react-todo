import { useState, useEffect } from "react";
import { uuid } from "uuidv4";

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

  const addTodo = (todo) => {
    const newTodo = {
      title: todo,
      completed: false,
      id: uuid(),
    };
    return todoService.add(newTodo).then((addedTodo) => {
      setTodos([addedTodo].concat(todos));
    });
  };

  return { todos, toggleTodo, deleteTodo, addTodo };
}
