import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import TodoItem from "./Todo";
import { Todo } from "../type";

const TodoList: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">(
    "all"
  );
  const todos = useSelector((state: RootState) =>
    state.todos.filter((todo) =>
      filter === "all"
        ? true
        : filter === "completed"
        ? todo.completed
        : !todo.completed
    )
  );

  if (todos.length === 0) {
    return <p>No todos left</p>;
  }

  return (
    <div>
      <div className="mb-3">
        <button
          className="btn btn-outline-secondary me-2"
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className="btn btn-outline-success me-2"
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
        <button
          className="btn btn-outline-warning"
          onClick={() => setFilter("incomplete")}
        >
          Incomplete
        </button>
      </div>
      {todos.map((todo: Todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
