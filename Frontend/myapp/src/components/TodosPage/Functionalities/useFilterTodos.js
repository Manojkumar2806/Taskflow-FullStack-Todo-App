export const useFilterTodos = (todos, filter) => {
    const filteredTodos = () => {
      let filtered = [...todos];
      if (filter === "pending") {
        filtered = filtered.filter((t) => !t.iscompleted);
      } else if (filter === "completed") {
        filtered = filtered.filter((t) => t.iscompleted);
      } else if (filter === "dueDate") {
        filtered.sort((a, b) => {
          const dateA = a.due_date ? new Date(a.due_date) : Infinity;
          const dateB = b.due_date ? new Date(b.due_date) : Infinity;
          return dateA - dateB;
        });
      }
      return filtered;
    };
  
    return { filteredTodos: filteredTodos() };
  };