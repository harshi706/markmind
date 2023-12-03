import React from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate=useNavigate();
    const [credentials, setCredentials] = React.useState({ email: '', password: '' });

    const handleClick = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
            }),
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
          localStorage.setItem('token',json.authtoken);
          navigate("/");
        }else{
          alert("Invalid credentials");
        }
    };

    const onChange = (e) => {
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div>
            <form onSubmit={handleClick}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={credentials.email}
                        onChange={onChange}
                        name="email"
                        aria-describedby="emailHelp"
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
                        value={credentials.password}
                        onChange={onChange}
                        name="password"
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Login;
