import React,{useContext,useState} from "react";
import NoteContext from "../context/notes/noteContext";

function AddNote(props) {
    let context  = useContext(NoteContext);
    const {addNote, handleAlert} = context;
    const [newNote, setNewNote] = useState({title: "", description:"", tag:''})


    const handleClick = (e)=>{
        e.preventDefault();
        addNote(newNote.title, newNote.description, newNote.tag)
        setNewNote({title: "", description:"", tag:''})
        handleAlert('success', "Note added successfully")
    }

    const onChange = (e)=>{
        setNewNote({...newNote, [e.target.name]: e.target.value}) //leave the note and add the new value to "newNote".
    }
  return (
    <div className={`sub-container form-div bg-secondary-${props.theme}`}>
      <h1 style={{ marginBottom: ".4em " }}>Add Note</h1>

      <form action="">
        <div className="form-row">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            minLength={3}
            placeholder="Title"
            onChange={onChange}
            value={newNote.title}
          />
        </div>
        <div className="form-row">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            required
            minLength={5}
            placeholder="Description" 
            onChange={onChange}
            value={newNote.description}
          />
        </div>
        <div className="form-row">
          <label htmlFor="tag">Tag</label>
          <input
            type="text"
            name="tag"
            id="tag"
            placeholder="e.g. Personal, Daily-Routine [Optional]"
            onChange={onChange}
            value={newNote.tag}
          />
        </div>
        <button disabled={newNote.title.length<3 || newNote.description.length<5}  className="btn btn-submit" type="submit" onClick={handleClick} >
          Add Note
        </button>
      </form>
    </div>
  );
}

export default AddNote;
