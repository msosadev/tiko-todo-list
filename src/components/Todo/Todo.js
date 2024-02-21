import TodoItem from "./TodoItem";
import "./Todo.css"

export default function Todo() {
  return (
    <div className="todo-wrapper">
      <header className="todo-header">
        <h2>To-dos</h2>
        <button>+ Add</button>
      </header>
      <div className="todo-list">
        <TodoItem id="todo1" description="Add tokens" />
        <TodoItem id="todo2" description="To exclude borders in CSS using the border attribute, Using border: 0; directly on an element in CSS removes all borders, ensuring no border is applied regardless of the default styling." />
        <TodoItem id="todo3" description="Implement api" />
      </div>
    </div>
  );
}
