export const useEditTodo = (
    editInput,
    editDate,
    todos,
    setTodos,
    setEditTodo,
    setEditInput,
    setEditDate,
    setError
  ) => {
    const handleEditTodo = async (id, close) => {
      if (!editInput.trim()) {
        setError("Todo title cannot be empty");
        return;
      }
  
      const updatedTodo = {
        title: editInput.trim(),
        iscompleted: todos.find((t) => t.id === id).iscompleted,
        due_date: editDate ? editDate.toISOString().split("T")[0] : null,
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
  
        const updated = await response.json();
        setTodos((prev) =>
          prev.map((todo) => (todo.id === id ? updated : todo))
        );
        setEditTodo(null);
        setEditInput("");
        setEditDate(null);
        setError(null);
        close();
      } catch (err) {
        setError(err.message);
      }
    };
  
    return { handleEditTodo };
  };