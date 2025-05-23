import { useState, useEffect, useRef } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useAddTodo } from "./Functionalities/useAddTodo";
import { useEditTodo } from "./Functionalities/useEditTodo";
import { useDeleteTodo } from "./Functionalities/useDeleteTodo";
import { useToggleTodo } from "./Functionalities/useToggleTodo";
import { useFilterTodos } from "./Functionalities/useFilterTodos";
// import { useNavigate } from "react-router-dom";


const TodosPage = ( {darkMode} ) => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [editTodo, setEditTodo] = useState(null);
  const [editInput, setEditInput] = useState("");
  const [editDate, setEditDate] = useState(null);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState(null);
  const datePickerRef = useRef(null);

  // const navigate = useNavigate();


  // console.log(darkMode);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("http://localhost:8000/get_todos/");
        if (!response.ok) throw new Error("Failed to fetch todos");
        const data = await response.json();
        setTodos(data);
  

      } catch (err) {
        setError(err.message);
      }
    };
    fetchTodos();
  }, []);



  const { handleAddTodo } = useAddTodo(
    inputValue,
    selectedDate,
    setTodos,
    setInputValue,
    setSelectedDate,
    setError
  );
  const { handleEditTodo } = useEditTodo(
    editInput,
    editDate,
    todos,
    setTodos,
    setEditTodo,
    setEditInput,
    setEditDate,
    setError
  );
  const { handleDeleteTodo } = useDeleteTodo(setTodos, setError);
  const { handleToggleTodo } = useToggleTodo(todos, setTodos, setError);
  const { filteredTodos } = useFilterTodos(todos, filter);

  return (
    <div className={`todos-page-container ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'} p-md-5 p-2 pt-4 shadow rounded border-secondary` } >
      <h2 className="todos-page-title text-start mb-md-5 mb-3">Add, Mark as completed, Edit, or Delete your todos.</h2>

      {error && (
        <div className="error-alert" role="alert">
          {error}
        </div>
      )}

      <TodoForm
        inputValue={inputValue}
        className="todo-form-container"
        setInputValue={setInputValue}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        datePickerRef={datePickerRef}
        handleSubmit={handleAddTodo}
        darkMode={darkMode}
      />

      <TodoList
        todos={filteredTodos}
        filter={filter}
        className="todo-list-container"
        setFilter={setFilter}
        handleToggleTodo={handleToggleTodo}
        handleDeleteTodo={handleDeleteTodo}
        handleEditTodo={handleEditTodo}
        editTodo={editTodo}
        setEditTodo={setEditTodo}
        editInput={editInput}
        setEditInput={setEditInput}
        editDate={editDate}
        setEditDate={setEditDate}
      />
    </div>
  );
};

export default TodosPage;
