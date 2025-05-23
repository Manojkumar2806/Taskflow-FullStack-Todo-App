export const useToggleTodo = (todos, setTodos, setError) => {
    const handleToggleTodo = async (id) => {
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;
  
      const updatedTodo = {
        ...todo,
        iscompleted: !todo.iscompleted,
      };
  
      try {
        const response = await fetch(`http://localhost:8000/update_todo/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTodo),
        });
  
        if (!response.ok) {
          throw new Error("Failed to update todo");
        }
  
        setTodos((prev) =>
          prev.map((t) => (t.id === id ? updatedTodo : t))
        );
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };
  
    return { handleToggleTodo };
  };