import React,{useContext} from 'react'
import NoteContext from "../context/notes/noteContext";


const Alert = () => {
    let context = useContext(NoteContext);
    let {alert} = context;
  return (
    <div className={`alert alert-${alert.type}`} id="msg"><strong style={{textTransform: "uppercase"}}>{alert.type} :</strong> {alert.msg} !</div>
  )
}

export default Alert