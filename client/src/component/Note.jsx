import React from 'react'
import { MdOutlineDelete } from "react-icons/md";
import useDeleteNote from '../hooks/useDeleteNote';
import { useState,useEffect } from 'react';

const Note = ({id, title, description, setNotes}) => {

  const {loading, remove} = useDeleteNote();
  
  
  const handleSubmit = async (id,e)=>{
    e.preventDefault();
    await remove(id);

    setNotes((pre) => pre.filter((n)=>n.id !== id));
  }


  return (
    <div>
      <div className="divider divider-primary"></div>
      <div className='main_Container flex justify-center items-center gap-10'>

        <div className='notes_container'>
          <h2>Title: {title}</h2>
          <p>Note: {description}</p>
        </div>
        <button onClick={(e)=>handleSubmit(id,e)} className="btn btn-square">
          <MdOutlineDelete className='text-lg' />
        </button>
      </div>
      <div className="divider divider-primary"></div>
    </div>
  )
}

export default Note
