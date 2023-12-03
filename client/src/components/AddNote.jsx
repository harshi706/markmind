import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const AddNote = () => {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = React.useState({
    title: '',
    description: '',
    tag: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addNote(note.title, note.description, note.tag);
    console.log("hii")
    setNote({
      title: '',
      description: '',
      tag: '',
    });
  };
  
  const onChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div className="container my-3">
        <h1>Add a note</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="htmlForm-label">
              Title
            </label><br />
            <input
              type="text"
              name="title"
              className="htmlForm-control"
              id="title"
              aria-describedby="emailHelp"
              value={note.title}
              required
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="htmlForm-label">
              Description
            </label><br />
            <input
              type="text"
              name="description"
              className="htmlhtmlForm-control"
              id="description"
              value={note.description}
              required
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="htmlForm-label">
              Tag
            </label><br />
            <input
              type="text"
              name="tag"
              className="htmlhtmlForm-control"
              id="tag"
              value={note.tag}
              required
              onChange={onChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
