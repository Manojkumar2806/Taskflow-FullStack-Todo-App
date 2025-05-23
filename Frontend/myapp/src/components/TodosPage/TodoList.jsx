import TodoItem from "./TodoItem";

const TodoList = ({
  todos,
  filter,
  setFilter,
  handleToggleTodo,
  handleDeleteTodo,
  handleEditTodo,
  setEditTodo,
  setEditInput,
  setEditDate,
}) => {
  const EmptyTodosImage = () => (
    <div className="d-flex justify-content-center text-center">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="Empty Todos"
        className="pt-5 pb-5 img-fluid"
      />
    </div>
  );

  const TodosHeading = () => (
    <div className="d-flex flex-row justify-content-between flex-wrap gap-4 text-center align-items-center">
      <h5>
        Total Todos:{" "}
        <button className="btn btn-secondary fw-bold px-2 mx-3" style={{width : '50px'}}>{todos.length}</button>
      </h5>
      
      <div className="text-center">
        <select
          className="form-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          aria-label="Filter todos"
        >
          <option value="all">All Todos</option>
          <option value="pending">Pending Todos</option>
          <option value="completed">Completed Todos</option>
          <option value="dueDate">Sort by Due Date</option>
        </select>
      </div>
    </div>
  );

  return (
    <ul className="TodosContainer pt-5 pb-5 flex-wrap">
      {TodosHeading()}
      <hr />
      {todos.length > 0 ? (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleToggleTodo={handleToggleTodo}
            handleDeleteTodo={handleDeleteTodo}
            handleEditTodo={handleEditTodo}
            setEditTodo={setEditTodo}
            setEditInput={setEditInput}
            setEditDate={setEditDate}
          />
        ))
      ) : (
        <div>
          <EmptyTodosImage />
          <h4 className="text-center">No Todos to display</h4>
        </div>
      )}
    </ul>
  );
};

export default TodoList;