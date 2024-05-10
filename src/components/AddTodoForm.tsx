import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/todoSlice";
import { Todo } from "../type";

const AddTodoForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(""); // State to handle the date input
  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim()) return;

    const newTodo: Todo = {
      id: Date.now(),
      title,
      description,
      completed: false,
      date, // Add the date when creating a new todo
    };
    dispatch(addTodo(newTodo));
    setTitle("");
    setDescription("");
    setDate(""); // Reset the date input after submitting
  };

  return (
    <div className="add-todo-form">
      <div className="card py-0 mb-3">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="mb-4">
            <h3>Add To Do List</h3>

            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description (Optional)
              </label>
              <textarea
                className="form-control"
                id="description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Add Todo
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTodoForm;
