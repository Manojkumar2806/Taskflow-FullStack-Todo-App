from sqlalchemy import Column, String, Boolean
from database import Base

class Todo(Base):
    __tablename__ = "todos"
    
    id = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=False)
    iscompleted = Column(Boolean, default=False)
    due_date = Column(String, nullable=True)