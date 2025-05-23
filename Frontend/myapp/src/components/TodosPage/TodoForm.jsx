import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SlCalender } from "react-icons/sl";
import { useState } from "react";

const TodoForm = ({
  inputValue,
  setInputValue,
  selectedDate,
  setSelectedDate,
  datePickerRef,
  handleSubmit,
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
  };

  const toggleDatePicker = () => {
    const isOpen = !isCalendarOpen;
    setIsCalendarOpen(isOpen);
    datePickerRef.current.setOpen(isOpen);
  };

  return (
    <form onSubmit={onSubmit} className="d-flex flex-column flex-md-row gap-5 p-2  text-white w-100 mx-auto align-items-center" style={{ maxWidth: '960px' }}>
      <div className="input-group flex-grow-1 d-flex align-items-center">
        <input
          type="text"
          className="form-control bg-white text-dark rounded py-1 px-3"
          placeholder="Add a new todo..."
          value={inputValue}
          onChange={handleInputChange}
          required
          style={{ height: '40px' }} 
        />
        <span
          className="input-group-text bg-secondary text-white d-flex justify-content-center rounded-end py-1 px-2"
          onClick={toggleDatePicker}
          style={{ cursor: 'pointer', height: '40px', width: '50px'  }}
          aria-label="Toggle date picker"
        >
          <SlCalender />
        </span>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
          className="form-control bg-white text-dark rounded-0 border-0 d-none"
          placeholderText="Pick a date"
          minDate={new Date()}
          ref={datePickerRef}
          open={isCalendarOpen}
          onClickOutside={() => setIsCalendarOpen(false)}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary rounded py-1 px-3"
        style={{ height: '38px', width: '150px' }} 
      >
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;