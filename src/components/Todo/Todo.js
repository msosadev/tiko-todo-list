import TodoItem from "./TodoItem";
import "./Todo.css";
import { useContext, useEffect, useState } from "react";
import { LocalAccessToken } from "../tokenContext";

export default function Todo() {
  const [description, setDescription] = useState("");
  const [todoList, setTodoList] = useState();
  const accessToken = useContext(LocalAccessToken);
  const api = "https://todos-api.public.tiko.energy/api/todos/";

  function fetchTodos() {
    fetch(api, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTodoList(data);
      })
      .catch((error) => console.error("Error:", error));
  }

  const addTodo = async () => {
    const data = { description };

    try {
      const response = await fetch(api, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);
      
      fetchTodos();
    } catch (error) {
      console.error("Error creating to-do:", error);
    } 
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
          <button onClick={addTodo}>+ Add</button>
        </div>
      </header>
      <div className="todo-list">
        {todoList && todoList.toReversed().map((todo) => (
          <TodoItem done={todo.done} id={todo.id} key={todo.id} description={todo.description} />
        ))}
      </div>
    </div>
  );
}
