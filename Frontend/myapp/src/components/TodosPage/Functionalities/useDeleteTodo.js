export const useDeleteTodo = (setTodos, setError) => {
    const handleDeleteTodo = async (id) => {
      try {
        const response = await fetch(`http://localhost:8000/delete_todo/${id}`, {
          method: "DELETE",
        });
  
        if (!response.ok) {
          throw new Error("Failed to delete todo");
        }
  
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };
  
    return { handleDeleteTodo };
  };