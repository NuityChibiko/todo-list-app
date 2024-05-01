import "./App.css";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";

function App() {
  return (
    <div className="App">
      <header className="App-header mb-4">
        <h1>To Do List</h1>
      </header>
      <main>
        <AddTodoForm />
        <TodoList />
      </main>
    </div>
  );
}

export default App;
