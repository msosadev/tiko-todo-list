import { useState } from "react";
import "./Login.css";

export default function Login() {
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");

    function submitHandler() {
        const item = {
            "email": email, 
            "password": password, 
        }
        console.log(item);
    }

    return (
        <div className="login-wrapper">
            <form className="login">
                <h1>Login</h1>
                <input onChange={e=> setEmail(e.target.value)} value={email} autoComplete="email" type="email" name="email" id="email" placeholder="Email" />
                <input onChange={e=> setPassword(e.target.value)} value={password} autoComplete="current-password" type="password" name="password" id="password" placeholder="Password" />
                <button onClick={submitHandler}>Login</button>
            </form>
        </div>
    )
}