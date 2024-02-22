import TodoItem from "./TodoItem";
import "./Todo.css";
import { useEffect, useState } from "react";

export default function Todo() {
  const [description, setDescription] = useState("");
  const accessToken = localStorage.getItem("access_token");
  const [todoList, setTodoList] = useState();
  const [loading, setLoading] = useState(true);

  function createTodo() {
    const data = { description };

    // Make a POST request to the todos endpoint
    fetch("https://todos-api.public.tiko.energy/api/todos/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        fetchTodos();
      })
      .catch((error) => {
        console.error("Error creating to-do:", error);
      })
      .finally(()=> setLoading(false));
  }

  function fetchTodos() {
    fetch("https://todos-api.public.tiko.energy/api/todos/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json", // Adjust the content type as needed
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setTodoList(data);
      })
      .catch((error) => console.error("Error:", error));
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="todo-wrapper">
      <header>
        <h2>To-dos</h2>
        <div className="todo-field">
          <input
            type="text"
            name="add-todo"
            id="add-todo"
            placeholder="Add to-do"
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={createTodo}>+ Add</button>
        </div>
      </header>
      <div className="todo-list">
        <p>{loading? "loading":"not loading"}</p>
        {/* {todoList && todoList.map((todo) => (
          <TodoItem id={todo.id} key={todo.id} description={todo.description} />
        ))} */}
        <TodoItem id="todo1" description="Add tokens" />
        <TodoItem
          id="todo2"
          description="To exclude borders in CSS using the border attribute, Using border: 0; directly on an element in CSS removes all borders, ensuring no border is applied regardless of the default styling."
        />
        <TodoItem id="todo3" description="Implement api" />
      </div>
    </div>
  );
}
