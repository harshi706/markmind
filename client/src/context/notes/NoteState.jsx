import React from "react";
import NoteContext from "./NoteContext";

const NoteState=(props)=>{
    const host="http://localhost:8000"
    const notesInitial=[]
    const[notes,setNotes]=React.useState(notesInitial)



    //fetch notes
    const getNote=async()=>{
        try{
        const response=await fetch (`${host}/api/notes/fetchallnotes`,{

            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token":localStorage.getItem('token')
            },
          });

        const json=await response.json();
        console.log(json);
        setNotes(json)
        }catch(error){
            console.log(error.message)
        }
    }


        //add notes
        const addNote = async (title, description, tag) => {
          try {
            const response = await fetch(`${host}/api/notes/addnotes`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
              },
              body: JSON.stringify({ title, description, tag }),
            });
            console.log("hi")
        
            if (!response.ok) {
              throw new Error(`Failed to add note: ${response.statusText}`);
            }
        
            const json = await response.json();
            console.log(json);
          } catch (error) {
            console.error("Error adding note:", error.message);
            // Handle the error as needed (show an error message, etc.)
          }
        };
        
        
          //delete note
          const deleteNote=async(id)=>{
            const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  "auth-token":localStorage.getItem('token')
                },
              });
              const json=await response.json(); 
              console.log(json);
            console.log(id);
            const newNotes=notes.filter((note)=>{
                return note._id!==id
            })
            setNotes(newNotes)
          }

       //update a note
          const editNote=async(id,title,description,tags)=>{

            const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  "auth-token":localStorage.getItem('token')
                },
                body: JSON.stringify({title,description,tags}), // body data type must match "Content-Type" header
              });
              const json=await response.json();
              console.log(json) // parses JSON response into native JavaScript objects

              let newNotes=JSON.parse(JSON.stringify(notes))
            for(let i=0;i<newNotes.length;i++){
                const element=newNotes[i];
                if(element._id===id){
                    newNotes[i].title=title;
                    newNotes[i].description=description;
                    newNotes[i].tags=tags;
                    break;
                }
            }
            setNotes(newNotes)
          }
    return(
        <NoteContext.Provider value={{notes,getNote,addNote,deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;