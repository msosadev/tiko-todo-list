import { useState } from "react";

export default function TodoItem(props) {
  const [done, setDone] = useState(false);

  function checkHandler() {
    setDone(!setDone)
  }
  return (
    <div>
      <input onChange={checkHandler} checked={done} type="checkbox" name={props.id} id={props.id} />
      <label htmlFor={props.id}>{props.description}</label>
    </div>
  );
}
