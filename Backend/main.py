from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import models
from database import SessionLocal, engine
from pydantic import BaseModel, validator

app = FastAPI()

# CORS Middleware Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Models
class TodoBase(BaseModel):
    title: str
    due_date: str | None = None
    iscompleted: bool = False

    @validator("title")
    def title_must_not_be_empty(cls, v):
        if not v.strip():
            raise ValueError("Title cannot be empty")
        return v.strip()

class TodoCreate(TodoBase):
    id: str

class TodoUpdate(TodoBase):
    pass  # Same as TodoBase, no id required since it's in the URL

class TodoResponse(TodoBase):
    id: str

    class Config:
        orm_mode = True

# Create Tables
models.Base.metadata.create_all(bind=engine)

# DB Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Routes
@app.post("/create_todo/", response_model=TodoResponse, status_code=status.HTTP_201_CREATED)
async def create_todo(todo: TodoCreate, db: Session = Depends(get_db)):
    try:
        # Check if ID already exists
        if db.query(models.Todo).filter(models.Todo.id == todo.id).first():
            raise HTTPException(status_code=400, detail="Todo ID already exists")
        
        new_todo = models.Todo(
            id=todo.id,
            title=todo.title,
            due_date=todo.due_date,
            iscompleted=todo.iscompleted
        )
        db.add(new_todo)
        db.commit()
        db.refresh(new_todo)
        return new_todo
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error creating todo: {str(e)}")

@app.get("/get_todos/", response_model=List[TodoResponse])
async def get_todos(db: Session = Depends(get_db)):
    return db.query(models.Todo).all()

@app.get("/get_todo/{id}", response_model=TodoResponse)
async def get_todo(id: str, db: Session = Depends(get_db)):
    todo = db.query(models.Todo).filter(models.Todo.id == id).first()
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo

@app.put("/update_todo/{id}", response_model=TodoResponse)
async def update_todo(id: str, todo: TodoUpdate, db: Session = Depends(get_db)):
    todo_to_update = db.query(models.Todo).filter(models.Todo.id == id).first()
    if not todo_to_update:
        raise HTTPException(status_code=404, detail="Todo not found")

    todo_to_update.title = todo.title
    todo_to_update.due_date = todo.due_date
    todo_to_update.iscompleted = todo.iscompleted

    db.commit()
    db.refresh(todo_to_update)
    return todo_to_update

@app.delete("/delete_todo/{id}", status_code=status.HTTP_200_OK)
async def delete_todo(id: str, db: Session = Depends(get_db)):
    todo = db.query(models.Todo).filter(models.Todo.id == id).first()
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    db.delete(todo)
    db.commit()
    return {"id": id, "status": "deleted"}