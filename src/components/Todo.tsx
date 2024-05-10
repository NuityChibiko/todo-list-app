import React from "react";
import { Todo } from "../type";
import { useDispatch } from "react-redux";
import { toggleTodo, deleteTodo } from "../store/todoSlice";

interface Props {
  todo: Todo;
}

const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useDispatch();

  return (
    <div className="card mb-2 py-0">
      <div className="card-body">
        <h5 className="card-title">{todo.title}</h5>
        {/* Display date if available */}
        {todo.date && (
          <p className="card-text">
            <strong>Date:</strong> {todo.date}
          </p>
        )}
        <div className="card-text">{todo.description}</div>
        <div className="d-flex justify-content-center mt-3 align-content-end">
          <button
            className={`btn btn-sm me-2 ${
              todo.completed ? "btn-success" : "btn-warning"
            }`}
            onClick={() => dispatch(toggleTodo(todo.id))}
          >
            <i
              className={`${
                todo.completed ? "fas fa-check-circle" : "far fa-circle"
              }`}
            ></i>{" "}
            {todo.completed ? "Completed" : "Incomplete"}
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => dispatch(deleteTodo(todo.id))}
          >
            <i className="fas fa-trash-alt"></i> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
