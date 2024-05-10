import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import TodoItem from "./Todo";
import { Todo } from "../type";
import { undoDelete } from "../store/todoSlice";

const TodoList: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">(
    "all"
  );
  const todos = useSelector((state: RootState) =>
    state.todos.todos.filter((todo) =>
      filter === "all"
        ? true
        : filter === "completed"
        ? todo.completed
        : !todo.completed
    )
  );
  const deletedStackLength = useSelector(
    (state: RootState) => state.todos.deletedStack.length
  );
  const dispatch = useDispatch();

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
          className="btn btn-outline-warning me-2"
          onClick={() => setFilter("incomplete")}
        >
          Incomplete
        </button>
        <button
          className="btn btn-outline-info"
          onClick={() => dispatch(undoDelete())}
          disabled={deletedStackLength === 0} // Correctly use the useSelector to get deletedStackLength
        >
          Undo Delete
        </button>
      </div>
      {todos.map((todo: Todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
