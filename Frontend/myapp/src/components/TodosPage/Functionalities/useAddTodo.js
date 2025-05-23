import { v4 as uuidv4 } from "uuid";

export const useAddTodo = (
  inputValue,
  selectedDate,
  setTodos,
  setInputValue,
  setSelectedDate,
  setError
) => {
  const handleAddTodo = async (e) => {
    e.preventDefault();

    if (!inputValue.trim()) {
      setError("Todo title cannot be empty");
      return;
    }

    const newTodo = {
      id: uuidv4(),
      title: inputValue.trim(),
      iscompleted: false,
      due_date: selectedDate ? selectedDate.toISOString().split("T")[0] : null,
    };

    try {
      const response = await fetch("http://localhost:8000/create_todo/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) {
        throw new Error("Failed to create todo");
      }

      const createdTodo = await response.json();
      setTodos((prev) => [...prev, createdTodo]);
      setInputValue("");
      setSelectedDate(null);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return { handleAddTodo };
};