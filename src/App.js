import React from "react";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import useTodo from "./hooks/useTodo";

export default function App() {
  const { todos, toggleTodo, deleteTodo, addTodo } = useTodo();

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
  );
}
