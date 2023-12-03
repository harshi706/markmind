import React from 'react'
import { useNavigate } from 'react-router-dom'


const Signup = () => {
  let navigate=useNavigate();
  const [credentials, setCredentials] = React.useState({ name:'',email: '', password: '' });

  const handleClick = async (e) => {
      e.preventDefault();
      const response = await fetch('http://localhost:8000/api/auth/createuser', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name:credentials.name,
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
        alert("Invalid input");
      }
  };

  const onChange = (e) => {
      setCredentials((prevCredentials) => ({
          ...prevCredentials,
          [e.target.name]: e.target.value,
      }));
  };



  return (
    <div className='container'>
      <form onSubmit={handleClick}>
      <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={onChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} minLength={5} id="password"/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" name='cpassword' value={credentials.cpassword} onChange={onChange} minLength={5} id="cpassword"/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup
