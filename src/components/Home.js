import React from "react";
import NoteItems from "../components/NoteItems";


function Home(props) {
  return (
    <>
      
        <NoteItems theme={props.theme} />
   
    </>
  );
}

export default Home;
