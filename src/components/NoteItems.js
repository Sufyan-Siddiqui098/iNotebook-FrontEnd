import React, { useContext, useEffect, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import AddNote from "../components/AddNote";
import { useNavigate } from "react-router-dom";

function NoteItems(props) {
  let navigate = useNavigate();
  let context = useContext(NoteContext);
  //eslint-disable-next-line
  const { note, deleteNote, getNotes, editNote, handleAlert} = context; //Object Destructuring

  const [newEditNote, setNewEditNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "default",
  });
  
  let modal = document.getElementById("edit-modal");
  const onChange = (e) => {
    setNewEditNote({ ...newEditNote, [e.target.name]: e.target.value });
  };
  
  const handleCloseBtn = () => {
    modal.classList.remove("open-modal");
  };
  
  
  const updateEditNote = (note) => {
    setNewEditNote({
      id: note._id,
      etitle: note.title,
      edescription: note.description,
      etag: note.tag,
    });
    // console.log(note);
    modal.classList.add("open-modal");
  };

  const handleUpdate = (e)=>{
    e.preventDefault();
    // console.log("updating the note... " + newEditNote);
    editNote(newEditNote.id, newEditNote.etitle, newEditNote.edescription, newEditNote.etag)
    handleAlert("success", "Note updated successfully")
    modal.classList.remove("open-modal");
  }
  
  useEffect(() => {
    //If the localStorage.getItem('token') have token(authtoken) then call the notes otherwise redirect to the login page
    if(localStorage.getItem("token")){
      getNotes();
    }
    else{
      navigate('/login')
    }

    //eslint-disable-next-line
  }, []);


  return (
    <>
      <div className={`edit-modal bg-primary-${props.theme}`} id="edit-modal">
        <div className="modal-header">
          <h4>Ediit Note</h4>
          <i className="fa-solid fa-circle-xmark" onClick={handleCloseBtn}></i>
        </div>
        <div className="modal-body">
          <form action="">
            <div className="form-row">
              <label htmlFor="edit-title">Title</label>
              <input
                type="text"
                name="etitle"
                id="edit-title"
                placeholder="Title"
                minLength={3}
                required
                value={newEditNote.etitle}
                onChange={onChange}
              />
            </div>
            <div className="form-row">
              <label htmlFor="edit-description">Description</label>
              <input
                type="text"
                name="edescription"
                id="edit-description"
                placeholder="Description"
                minLength={5}
                required
                value={newEditNote.edescription}
                onChange={onChange}
              />
            </div>
            <div className="form-row">
              <label htmlFor="edit-tag">Tag</label>
              <input
                type="text"
                name="etag"
                id="edit-tag"
                placeholder="e.g. Personal, Daily-Routine [Optional]"
                value={newEditNote.etag}
                onChange={onChange}
              />
            </div>
            <button
              className="btn btn-submit"
              type="submit"
              onClick={handleUpdate}
              disabled={newEditNote.etitle.length<3 || newEditNote.edescription.length<5}
             
            >
              Update Note
            </button>
          </form>
        </div>
      </div>
      <AddNote theme={props.theme} />
      <div className={`sub-container bg-secondary-${props.theme}`}>
        <h1 style={{ marginBottom: ".8em" }}>Notes</h1>
        <div className="flex-col">
          {note.length ===0 && "No note to display "}
          {note.map((elem) => {
            return (
              // <div className="note-card" key={note.indexOf(elem)}>
              <div className="note-card" key={elem._id}>
                <div className="flex">
                  <h4>{elem.title}</h4>
                  <div className="note-icon">
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => {
                        return deleteNote(elem._id);
                      }}
                    ></i>
                    <i
                      className="fa-solid fa-pen-to-square"
                      onClick={() => {
                        updateEditNote(elem);
                      }}
                    ></i>
                  </div>
                </div>
                <p>{elem.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default NoteItems;
