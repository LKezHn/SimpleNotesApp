import React, { useContext } from 'react';
import axios from 'axios';
import ModalWindow from '../ModalWindow';

import NotesContext from '../../context/Notes/NotesContext';

function Note({content}){

  const { getNotes, openModal, setSelectedNote } = useContext(NotesContext);
  const token = localStorage.getItem('token')
  const apiUrl = 'http://localhost:4000/api/v1/notes'

  const deleteNote = (e) =>{
    e.preventDefault()
    axios.delete(`${apiUrl}/${content._id}`,{ 
      headers: {
        'x-access-token': token
      }
    }).then ( (res) =>{
      console.log(`${content._id} borrado`)
      getNotes(token)
    }).catch( err => console.error(err))
  }

  const open = (e) =>{
    console.log(content)
    e.preventDefault();
    setSelectedNote(content)
    openModal()
  }

  return(
    <div className='mx-2 my-1 py-1 px-4 rounded border border-purple-600 bg-gray-100 cursor-pointer text-left'>
      <span className='text-sm font-light text-purple-900'>{ content.noteTitle.length <= 17 ? content.noteTitle :`${content.noteTitle.slice(0,17)}...`  }</span>
      <div className='float-right'>
        <button className='text-purple-500 m-0 px-1 text-xs' onClick={open}>Edit</button>
        <button className='text-purple-500 m-0 px-1 text-md font-bold' onClick={ deleteNote }>x</button>
      </div>
      <ModalWindow />
    </div>
  )
}

export default Note;