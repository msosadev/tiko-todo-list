import { useState } from "react";

export default function TodoItem(props) {
  const [done, setDone] = useState(props.done);
  const accessToken = localStorage.getItem("access_token");

  const checkHandler = async (e) => {
    const api = `https://todos-api.public.tiko.energy/api/todos/${props.id}`;
    const data = {
      description: `${props.description}`,
      done: !props.done,
    };

    try {
      await fetch(api, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("Error creating to-do:", error);
    }

    setDone(!done);
  };
  return (
    <div>
      <input
        onChange={checkHandler}
        checked={done}
        type="checkbox"
        name={props.id}
        id={props.id}
      />
      <label htmlFor={props.id}>{props.description}</label>
    </div>
  );
}
