import React,{useState} from 'react'
import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import About from './components/About';
import Login from './components/Login';
import { Signup } from './components/Signup';
import Alert from './components/Alert';

function App() {
  const [dark, setDark] = useState(false)
  let handleTheme=()=>{
    setDark(!dark);
  }
  let theme = dark?"dark":"light";
  return (
    <>
   <NoteState>
    <Router>
      <NavBar theme={theme}  handleTheme = {handleTheme}/>
      <Alert/>
    <div className={`container bg-primary-${theme}`}>
    
      <Routes>
        <Route exact path ='/' element={<Home theme={theme}/>}/>
        <Route exact path ='/aboutus' element={<About theme={theme}/>}/>
        <Route exact path ='/login' element={<Login theme={theme}/>}/>
        <Route exact path ='/signup' element={<Signup theme={theme}/>}/>
      </Routes>
    
      {/* <div >This is App</div> */}
    </div>

    </Router>
   </NoteState>
   </>
  );
}

export default App;
