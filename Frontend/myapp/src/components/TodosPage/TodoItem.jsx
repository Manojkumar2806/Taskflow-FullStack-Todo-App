import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TodoItem = ({
  todo,
  handleToggleTodo,
  handleDeleteTodo,
  handleEditTodo,
  setEditTodo,
  setEditInput,
  setEditDate,
  darkMode,
}) => {
  const { id, title, iscompleted, due_date } = todo;
  const displayStatus = iscompleted ? "Completed" : "Pending";

  return (
<li className="list-group-item container d-flex gap-2 justify-content-between w-100 w-md-50 align-items-center flex-wrap todo-item mt-3 mt-md-4 p-md-3 p-2 rounded border border-secondary shadow-sm">
  {/* Checkbox + Title + Due Date */}
  <div className="d-flex align-items-center gap-3 flex-grow-1">
    <input
      type="checkbox"
      checked={iscompleted}
      onChange={() => handleToggleTodo(id)}
      aria-label={`Mark ${title} as ${iscompleted ? "pending" : "completed"}`}
      style={{ cursor: "pointer", width: "18px", height: "18px" }}
      className="form-check-input"
    />
    <div className="d-flex flex-column">
      <div>{title}</div>
      <small className={`${darkMode ? 'text-secondary' : 'text-secondary'}`}>
        Due: {due_date || "No date"}
      </small>
    </div>
  </div>

  {/* Status Badge + Edit + Delete */}
  <div className="d-flex align-items-center gap-3 flex-grow-0">
    <span className={`badge ${iscompleted ? "bg-success" : "bg-warning text-dark"}`} style={{ padding: "0.5em 1em" }}>
      {displayStatus}
    </span>
    <Popup
      trigger={
        <FaEdit
          className="text-primary edit-icon"
          aria-label={`Edit ${title}`}
          style={{ cursor: "pointer" }}
          size={25}
        />
      }
      modal
      nested
      onOpen={() => {
        setEditTodo(todo);
        setEditInput(todo.title);
        setEditDate(todo.due_date ? new Date(todo.due_date) : null);
      }}
    >
      {(close) => (
        <div className={`p-3 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'} rounded-5`}>
          <h4>Edit Todo</h4>
          <input
            type="text"
            className="form-control mb-2"
            value={todo.title}
            onChange={(e) => setEditInput(e.target.value)}
            aria-label="Edit todo title"
          />
          <DatePicker
            selected={todo.due_date ? new Date(todo.due_date) : null}
            onChange={(date) => setEditDate(date)}
            className="form-control mb-3"
            placeholderText="Pick a new date"
          />
          <div className="d-flex justify-content-end gap-2">
            <button
              className="btn btn-secondary"
              onClick={close}
              aria-label="Cancel edit"
            >
              Cancel
            </button>
            <button
              className="btn btn-success"
              onClick={() => handleEditTodo(id, close)}
              aria-label="Save edit"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </Popup>

    <MdDelete
      className="text-danger delete-icon"
      onClick={() => handleDeleteTodo(id)}
      aria-label={`Delete ${title}`}
      size={28}
      style={{ cursor: "pointer" }}
    />
  </div>
</li>


  );
};

export default TodoItem;