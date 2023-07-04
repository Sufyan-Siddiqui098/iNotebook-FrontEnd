import React,{useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import NoteContext from '../context/notes/noteContext';

export const Signup = (props) => {
  //Context API
  const context = useContext(NoteContext)
  let {handleAlert} = context;
  //Form 
  const [formData, setFormData] = useState({name:"", email:"", password:""})
  const navigate = useNavigate();

  const host = 'https://enshrined-rain-cupboard.glitch.me'; //backend link (hosted)


  const handleSubmit = async(e)=>{
    e.preventDefault();
    let {name, email, password} = formData;
    //API CALL
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name, email, password})
    })

    let json = await response.json()
    // console.log(json)

    if(json.success){
      localStorage.setItem('token', json.authtoken)
      navigate('/')
      handleAlert("success", "Account Created Successfully")
    }
    else{
      handleAlert("error", "Invalid Details")
    }

  }

  const onChange = (e)=>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }


  return (
    <div className={`sub-container form-div bg-secondary-${props.theme}`}>
    <h1 style={{ marginBottom: ".4em " }}>Sign-up to iNotebook</h1>

    <form onSubmit={handleSubmit}>
        <div className="form-row">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Your Name"
          required
          value={formData.name}
          minLength={3}
          onChange={onChange}

        />
      </div>
      <div className="form-row">
        <label htmlFor="title">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={onChange}
        />
      </div>
      <div className="form-row">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password" 
          required
          value={formData.password}
          minLength={5}
          onChange={onChange}
        />
      </div>
      
      <button   className="btn btn-submit" type="submit" >
        Submit
      </button>
    </form>
  </div>
  )
}
