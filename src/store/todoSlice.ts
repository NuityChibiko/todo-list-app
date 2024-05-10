import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../type";

// Define the structure of the state to include deleted todos
interface TodoState {
  todos: Todo[];
  deletedStack: Todo[];
}

const initialState: TodoState = {
  todos: JSON.parse(localStorage.getItem("todos") || "[]").map(
    (todo: Todo) => ({
      ...todo,
      date: todo.date, // Assuming date is stored as a string
    })
  ),
  deletedStack: [], // Initialize the stack for deleted todos
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        localStorage.setItem("todos", JSON.stringify(state.todos));
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      const index = state.todos.findIndex((todo) => todo.id === action.payload);
      if (index !== -1) {
        const [deletedTodo] = state.todos.splice(index, 1);
        state.deletedStack.push(deletedTodo);
        localStorage.setItem("todos", JSON.stringify(state.todos));
      }
    },
    undoDelete: (state) => {
      const todoToRestore = state.deletedStack.pop();
      if (todoToRestore) {
        state.todos.push(todoToRestore);
        localStorage.setItem("todos", JSON.stringify(state.todos));
      }
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, undoDelete } =
  todosSlice.actions;
export default todosSlice.reducer;
