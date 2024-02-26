import { useContext, useState } from "react";
import { TokenContext } from "../tokenContext";

export default function TodoItem(props) {
  // The done property is passed though props whenever the to-do list is fetched, it is then stored in a state "done, setDone" to be modified
  const [done, setDone] = useState(props.done);
  const { tokenState } = useContext(TokenContext);
  const accessToken = tokenState.access;
  const domain = "https://todos-api.public.tiko.energy";

  // It sends an api request to update the todo checked and also updates the done state
  const checkHandler = async () => {
    const api = `${domain}/api/todos/${props.id}`;
    const data = {
      description: `${props.description}`,
      done: !done,
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
      console.error("Error checking to-do:", error);
    }
    // If the api call is successful, update the done state
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
