import { useState } from "react";

export default function TodoItem(props) {
  const [done, setDone] = useState(false);
  const accessToken = localStorage.getItem("access_token");

  const checkHandler = async () => {
    // setDone(!setDone);
    const api = "https://todos-api.public.tiko.energy/api/todos/234";
    const data = {
      "description": "epico",
      "done": true,
    };

    console.log(data);

    try {
      const response = await fetch(api, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error creating to-do:", error);
    } 

    // const requestOptions = {
    //   method: "PUT",
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // };
    // fetch(api, requestOptions)
    //   .then((response) => response.json())
    //   .then((result) => console.log(result))
    //   .catch((error) => console.log(error));
  }
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
