import React, { useState } from "react";

import menuIcon from "./Images/menu-icon.png";
import closeIcon from "./Images/close-icon.png";
import {Link, useNavigate} from "react-router-dom"

export default function Navbar(props) {
  const [menu, setMenu] = useState(true);
  const handleMenu = () => {
    setMenu(!menu);
    let nav = document.getElementById("nav");
    nav.classList.toggle("visible");
  };

  let navigate = useNavigate();
  const handleLogOut = ()=>{
    localStorage.removeItem('token')
    navigate('/login')
  }

  let menuSwitch = menu ? menuIcon : closeIcon;

  return (
    <header className={`bg-secondary-${props.theme}`}>
      <div className="logo">iNotebook</div>
      
      <div className="menu-icon" onClick={handleMenu}>
        <img src={menuSwitch} alt="" />
      </div>{" "}
      {/*MENU ICON*/}
      <nav  id="nav">

        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/aboutus">About Me</Link>
        {!localStorage.getItem('token')?<div className="nav-flex">
        <Link style={{fontWeight: "normal", borderRadius: ".5em", textDecoration: "none", padding: ".5em .8em" }} className="btn btn-submit" to="/login">Login</Link>
        <Link style={{fontWeight: "normal", borderRadius: ".5em", textDecoration: "none", padding: ".5em .8em"}} className="btn btn-submit" to="/signup">Sign-Up</Link>
        </div>: <button className="btn btn-submit" onClick={handleLogOut}>Logout</button>}
      </nav>
      <button className="theme-btn btn" onClick={props.handleTheme}>{props.theme==='dark'?"Light Mode":"Dark Mode"}</button>
    </header>
  );
}
