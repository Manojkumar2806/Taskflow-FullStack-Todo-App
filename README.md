# 🧠 TaskFlow – Fullstack Todo App
> **Effortless productivity. Smart. Simple. Scalable.**

---



<div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
  <img src="https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white&style=for-the-badge" alt="React" />
  <img src="https://img.shields.io/badge/-FastAPI-009688?logo=fastapi&logoColor=white&style=for-the-badge" alt="FastAPI" />
  <img src="https://img.shields.io/badge/-PostgreSQL-336791?logo=postgresql&logoColor=white&style=for-the-badge" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/-SQLAlchemy-000000?logo=sqlalchemy&logoColor=white&style=for-the-badge" alt="SQLAlchemy" />
  <img src="https://img.shields.io/badge/-Psycopg2-336791?style=for-the-badge" alt="Psycopg2" />
  <img src="https://img.shields.io/badge/-Bootstrap-563D7C?logo=bootstrap&logoColor=white&style=for-the-badge" alt="Bootstrap" />
  <img src="https://img.shields.io/badge/-CSS3-1572B6?logo=css3&logoColor=white&style=for-the-badge" alt="CSS3" />
  <img src="https://img.shields.io/badge/-Todo%20List-FCA121?style=for-the-badge" alt="Todo List" />
  <img src="https://img.shields.io/badge/-Dashboard-4A90E2?style=for-the-badge" alt="Dashboard" />
  <img src="https://img.shields.io/badge/-Fullstack-2C3E50?style=for-the-badge" alt="Fullstack" />
</div>




---



## 📋 Description

TaskFlow is a modern, intuitive Todo application built with a fullstack architecture designed to enhance productivity. Built with `**React (Hooks)** on the frontend and **FastAPI** on the backend`, it ensures seamless interactions, rapid state updates, and reliable data management. Create, edit, toggle, filter, and delete tasks with real-time sync and validation—all through a clean and minimal interface.

---


## 🖼️ Project Preview

| Web App UI (Placeholder) | Mobile View (Placeholder) |
|--------------------------|----------------------------|
| ![Desktop UI](./assets/desktop-ui.png) | ![Mobile UI](./assets/mobile-ui.png) |

---


## 🚀 Features

| Feature            | Description                                                           |
|-------------------|-----------------------------------------------------------------------|
| ✅ Add Todos       | Create todos with title and optional due date                         |
| ✏️ Edit Todos      | Update existing todo’s title or due date with inline validation       |
| 🔁 Toggle Complete | Mark todos as completed or pending instantly                          |
| 🗑️ Delete Todos    | Remove todos permanently from the list                                |
| 🔍 Filter Todos    | View all, only pending, completed, or sort by due date                |
| 📊 Dashboard       | Interactive pie, bar, and line charts to visualize completion rates, due dates, and productivity trends |
| 🔄 Real-time Sync  | All operations reflect instantly via robust API communication         |
| ⚠️ Error Handling  | Friendly error feedback for every user action                         |

---

## 🔌 API Endpoints

| Method | Endpoint               | Description                    |
|--------|------------------------|--------------------------------|
| `GET`  | `/get_todos`           | Fetch all todos                |
| `POST` | `/add_todo`            | Add a new todo                 |
| `PUT`  | `/update_todo/{id}`    | Update or toggle a todo by ID  |
| `DELETE` | `/delete_todo/{id}` | Delete a todo by ID            |

---

## 🛠️ Frontend Functional Hooks

| Hook              | Responsibility                                |
|------------------|------------------------------------------------|
| `useDeleteTodo`  | Handles deletion and state sync                |
| `useEditTodo`    | Updates todo content and due date              |
| `useToggleTodo`  | Toggles completion status of a todo            |
| `useFilterTodos` | Filters todos based on status or due date      |

---

## 🧱 Technologies Used

| Frontend      | Backend     | Styling     | State Management | Tools        |
|---------------|-------------|-------------|------------------|--------------|
| React (Hooks) | FastAPI     | CSS3        | useState/useEffect | REST APIs    |
| Vite          | Python 3.10 | HTML5       | Custom Hooks     | Uvicorn      |
| Axios         | PostgreSql + Sqlalchemy + Psycopg4     | Bootstrap | React Components | VSCode/Git   |

---

## ⚙️ Setup & Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/taskflow.git
cd FULLSTACKTODO

# Install frontend dependencies
cd frontend myapp
npm install
npm run dev

# Setup backend (FastAPI)
cd ../backend
pip install -r requirements.txt
uvicorn main:app --reload
```


