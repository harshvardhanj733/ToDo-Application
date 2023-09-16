import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup() {

    const navigate = useNavigate();
    const url = "http://localhost:80"

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const onChangeUsername = (event)=>{
        setUsername(event.target.value);
    }
    const onChangeEmail = (event)=>{
        setEmail(event.target.value);
    }
    const onChangePassword = (event)=>{
        setPassword(event.target.value);
    }
    const onChangeConfirmPassword = (event)=>{
        setConfirmPassword(event.target.value);
    }

    const onSubmitButton = async(event)=>{
        event.preventDefault();
        console.log({
            username, email, password, confirmPassword
        })
        const result = await fetch(url+'/api/signup', {
            method: "POST",
            body:JSON.stringify({
                username,
                email,
                password,
                confirmPassword
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await result.json();
        console.log(data);
        if(data.username){
            alert("User Created Successfully: "+data.username);
            navigate('/login');
        }
        else{
            alert("The following error occured: "+data.message);
        }

    }

    return (
        <section>
            <form>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        aria-describedby="emailHelp"
                        value={username}
                        onChange={onChangeUsername}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={onChangeEmail}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={onChangePassword}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={onChangeConfirmPassword}
                    />
                </div>
                <button type="submit" className="btn btn-primary" onClick={onSubmitButton}>
                    Submit
                </button>
            </form>

        </section>
    )
}
