import React, { useState } from "react";
import NoteContext from "./noteContext"; //Importing the created context from the file.

const NoteState = (props) => {
  // let host = "http://localhost:5000";
  let host = "https://enshrined-rain-cupboard.glitch.me";
  let s1 = [];

  const [note, setNote] = useState(s1);
  const [alert, setAlert ] = useState("")
  //Fetching All Notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });

    let json = await response.json();
    // console.log(host);
    setNote(json);
  };

  //Add a Note
  const addNote = async (title, description, tag) => {

    //Checking the Title & Description shouldn't be empty
    if (title !== "" && description !== "") {

      // API Call
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
        body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
      });

      console.log("Adding a Note");
      let json = await response.json();
      console.log(json);
      setNote(note.concat(json));

    } else { //When the title or description empty through an error
      console.error("Title and Description is compulsory !!");
    }
  };

  //Delete a Note
  const deleteNote = async(id) => {
    // API Call
    const response = await fetch(
      `${host}/api/notes/deletenote/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
      }
    );
    const json = await response.json();
    // console.log("Response from server for deleting the note ");
    console.log(json)
    //Logic to Delete the Note
    // console.log("Deleting Note with id " + id);
    let newNote = note.filter((elem) => {
      return elem._id !== id;
    });
    setNote(newNote);
    handleAlert("success", "Deleted successfully")
  };

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(
      `${host}/api/notes/updatenote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
        body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
      }
    );
    // console.log(`Note with id ${id} has been edited !!`)

    // eslint-disable-next-line
    let json = await response.json();
    // console.log(json)
      let   newNote = JSON.parse(JSON.stringify(note))
    for (let i = 0; i < newNote.length; i++) {
      let element = newNote[i];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break; //break the loop after setting the above parameters
      }
    }
    setNote(newNote)
  };

  const handleAlert = (type, message)=>{
    setAlert({type: type, msg: message})
    let msg = document.getElementById("msg")
    msg.style.display="block"
    setTimeout(() => {
      msg.style.display= 'none'
    }, 1500);
  }


  return (
    <NoteContext.Provider
      value={{ note, addNote, deleteNote, editNote, getNotes, handleAlert, alert }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
