import React,{useContext, useEffect,useRef} from 'react'
import Noteitem from './Noteitem';
import NoteContext from '../context/notes/NoteContext';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
import NoteState from '../context/notes/NoteState';


const Notes = () => {
  let navigate=useNavigate();
    const context=useContext(NoteContext);
    const {notes,getNote,editNote}=context;
    useEffect(()=>{
      if(localStorage.getItem('token')){
        getNote();
      }else{
        navigate('/login')
      }
    })
    const[note,setNote]=React.useState({
        id:"",
        etitle:"",
        edescription:"",
        etag:"default"
    })
    const ref=useRef(null);
    const refClose=useRef(null);

    const updateNote=(currentNote)=>{
        ref.current.click();
        setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
    }
    
    const handleClick=(e)=>{
        console.log("updating",note);
        editNote(note.id,note.etitle,note.edescription)
        refClose.current.click();
      //  addNote(note.title,note.description,note.tag);

    }
    const onChange=(e)=>{
        setNote({...note,
            [e.target.name]:e.target.value
        })
    }
  return (
    <div>
    <AddNote/>
<button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
                <div className="mb-3">
                    <label htmlFor="title" className="htmlForm-label">Title</label><br/>
                    <input type="text" name="etitle" className="htmlForm-control" id="etitle" aria-describedby="emailHelp" value={note.etitle} required onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="htmlForm-label">Description</label><br/>
                    <input type="text" name="edescription" className="htmlhtmlForm-control" id="edescription" value={note.edescription} required onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="htmlForm-label">Tag</label><br/>
                    <input type="text" name="etag" className="htmlhtmlForm-control" id="etag" value={note.etag} onChange={onChange}/>
                </div>               
            </form>     
              
      </div>
      <div className="modal-footer">
        <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button"  onClick={handleClick} className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
      <div className='row'>
      <h1>Your notes</h1>
      <div className='container'>
        {notes.length===0 && 'No notes to display'}
      </div>
            {notes.map((note)=>{
                return <Noteitem 
                updateNote={updateNote}
                note={note}/>
            })}
      </div>
    </div>
  )
}

export default Notes
