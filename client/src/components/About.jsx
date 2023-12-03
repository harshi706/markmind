import React,{useContext, useEffect}from 'react';
import NoteContext from '../context/notes/NoteContext';

const About = () => {
    const a=useContext(NoteContext)
    useEffect(()=>{
        a.update();
    },[])
  return (
    <div>
      {a.state.name}
    </div>
  );
};

export default About;
