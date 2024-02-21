import { useState } from "react";
import "./Register.css";

export default function Register() {
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [password2, setPassword2]= useState("");
    const [firstName, setFirstName]= useState("");
    const [lastName, setLastName]= useState("");

    function submitHandler() {
        const item = {
            "email": email, 
            "password": password, 
            "password2": password2, 
            "first-name": firstName,
            "last-name": lastName
        }
        console.log(item);
    }

    return (
        <div className="register-wrapper">
            <form className="register">
                <h1>Register</h1>
                <input onChange={e=> setEmail(e.target.value)} value={email} autoComplete="email" type="email" name="email" id="email" placeholder="Email" />
                <input onChange={e=> setPassword(e.target.value)} value={password} autoComplete="new-password" type="password" name="password1" id="password1" placeholder="Password" />
                <input onChange={e=> setPassword2(e.target.value)} value={password2} autoComplete="new-password"  type="password" name="password2" id="password2" placeholder="Repeat password" />
                <input onChange={e=> setFirstName(e.target.value)} value={firstName} autoComplete="given-name" type="text" name="first_name" id="first_name" placeholder="First name"/>
                <input onChange={e=> setLastName(e.target.value)} value={lastName} autoComplete="family-name" type="text" name="last_name" id="last_name" placeholder="Last Name"/>
                <button type="button" onClick={submitHandler}>Register</button>
            </form>
        </div>
    )
}