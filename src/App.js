import React, { useMemo, useState } from "react";

import TodoFilter from "./components/TodoFilter";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import useTodo from "./hooks/useTodo";

export default function App() {
  const { todos, toggleTodo, deleteTodo, addTodo } = useTodo();
  const [filter, setFilter] = useState("all");

  const handleFilter = (even) => {
    setFilter(even.target.value);
  };
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      case "all":
      default:
        return todos;
    }
  }, [todos, filter]);

  return (
    <div>
      <h1>Todo List</h1>
      <TodoFilter selectedFilter={filter} handleFilter={handleFilter} />
      <TodoForm addTodo={addTodo} />
      <TodoList todos={filteredTodos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
  );
}
