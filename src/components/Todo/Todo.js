import TodoItem from "./TodoItem";
import "./Todo.css";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../tokenContext";
import { verifyAccessToken } from "../authService";

export default function Todo() {
  const [description, setDescription] = useState("");
  const [todoList, setTodoList] = useState();
  const [loading, setLoading] = useState(false);
  const [isTokenVerified, setIsTokenVerified] = useState(false);
  const { tokenState } = useContext(TokenContext);
  const accessToken = tokenState.access;
  const domain = "https://todos-api.public.tiko.energy";
  const api = `${domain}/api/todos/`;

  // Makes an api call to fetch the to-do list
  async function fetchTodos() {
    setLoading(true);

    try {
      const response = await fetch(api, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setTodoList(data); // Sets data to the todoList state, it will then map and add every item
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Set loading to false regardless of success or error
    }
  }

  // Function that takes the description from the input field and creates a new to-do item
  const addTodo = async () => {
    const data = { description };

    try {
      await fetch(api, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      await fetchTodos(); // Wait for fetchTodos to complete before moving on
    } catch (error) {
      console.error("Error creating to-do:", error);
    }
    setDescription("");
  };

  // Handler that allows enter to add a new item
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTodo();
    }
  };

  useEffect(() => {
    const isTokenVerified = verifyAccessToken();

    // verifyAccessToken returns a promise, inside the promise, it will return true or false if the token is verified
    isTokenVerified
      .then(() => {
        setIsTokenVerified(true);
        fetchTodos(); // Only fetches the list if the token is verified
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <div className="todo-wrapper">
      <header>
        <h2>To-dos</h2>
        <div className="todo-field">
          <input
            type="text"
            name="add-todo"
            id="add-todo"
            value={description}
            placeholder="Add to-do"
            maxLength={30}
            onKeyDown={handleKeyPress}
            onChange={handleChange}
          />
          <button onClick={addTodo}>+ Add</button>
        </div>
      </header>
      <div className="todo-list">
        {
          // This conditional checks first if the api requests is loading or not, then checks if the token is verified to map through the todo list. In case the token is not verified it will show an error message.
          loading ? (
            "Loading"
          ) : isTokenVerified ? (
            todoList && todoList.length > 0 ? (
              todoList
                .sort((a, b) => b.id - a.id) // Sorting by todo.id in descending order
                .map((todo) => (
                  <TodoItem
                    done={todo.done}
                    id={todo.id}
                    key={todo.id}
                    description={todo.description}
                  />
                ))
            ) : (
              <p>To-dos not found.</p>
            )
          ) : (
            <p>Token verification failed. Cannot fetch data.</p>
          )
        }
      </div>
    </div>
  );
}
