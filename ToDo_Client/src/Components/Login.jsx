import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
export default function Login(props) {

    const url = "https://todo-api-wqod.onrender.com"

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const onChangeUsername = (event)=>{
        setUsername(event.target.value);
    }

    const onChangePassword = (event)=>{
        setPassword(event.target.value);
    }

    const onSubmitButton = async (event)=>{
        event.preventDefault();

        console.log({username, password});

        const result = await fetch(url+'/api/login', {
            method: "POST",
            body: JSON.stringify({username, password}),
            headers:{
                "Content-Type": "application/json"
            }
        })

        const data = await result.json();

        if(data.token){
            console.log(data.token);
            // props.setToken(data.token);
            localStorage.setItem('token', data.token);

            navigate('/todos/dashboard')
        }
        else{
            alert("Message is: "+data.message);
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
                <button type="submit" className="btn btn-primary" onClick={onSubmitButton}>
                    Submit
                </button>
            </form>
        </section>
    )
}
