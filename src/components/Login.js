import React,{useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import NoteContext from '../context/notes/noteContext';

const Login = (props) => {
  //Calling Alert from CONTEXT
  const context = useContext(NoteContext)
  let {handleAlert} = context;
  //Used to navigate to page
  let navigate = useNavigate();
  //Credentials
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const host = 'https://enshrined-rain-cupboard.glitch.me';

  const onChange = (e)=> {
    setCredentials({...credentials, [e.target.name]: e.target.value }); //leave the note and add the new value to "newNote".
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }), // body data type must match "Content-Type" header
    });
    let json = await response.json();
    // console.log(json)
    if(json.success){
      localStorage.setItem('token', json.authtoken)
      handleAlert("success", "Logged in Successfully")
      navigate("/")
    }
    else{
      handleAlert("error", "Invalid Credentials")
    }
  }

  return (
    <div className={`sub-container form-div bg-secondary-${props.theme}`}>
      <h1 style={{ marginBottom: ".4em " }}>Login to iNotebook</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="title">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            //   minLength={3}
            placeholder="Email"
              onChange={onChange}
              value={credentials.email}
          />
        </div>
        <div className="form-row">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            placeholder="Password"
            //   minLength={5}
              onChange={onChange}
              value={credentials.password}
          />
        </div>
       
        <button className="btn btn-submit" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
