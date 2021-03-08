import React, { useContext } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

import NotesContext from '../../context/Notes/NotesContext';

export default function ModalWindow(){

  const { 
      getNotes, 
      modalStatus, 
      closeModal, 
      selectedNote, 
      setSelectedNoteContent 
    } = useContext(NotesContext);

  const uri = 'http://localhost:4000/api/v1/notes'
  const token = localStorage.getItem('token');

  const setContent = (e) =>{
    const newContent = {
      ...selectedNote, 
      [e.target.name]: e.target.value
    }
    setSelectedNoteContent(newContent)
  }


  const handleSaveNote = (e) =>{
    e.preventDefault();
    axios.put(`${uri}/${selectedNote._id}`, 
      { 
        noteTitle: selectedNote.noteTitle, 
        noteDescription: selectedNote.noteDescription
      },{
    headers: {
        'x-access-token': token
      }
    }).then( res => {
      console.log('Edited!')
      getNotes(token)
    }).catch( err => console.error(err))
    closeModal()
  }

  return(
    <Modal
      ariaHideApp={false}
      isOpen={modalStatus}
      contentLabel='Edit Note'
      onRequestClose={closeModal}
      style={{
        overlay: {
          backgroundColor: 'rgba(255, 255, 255, 0.09)'
        },
        content: {
          backgroundColor: '#F3F4F6',
          border: '1px solid #7C3AED',
          height: '70%',
          width: '50%',
          margin: 'auto auto'
        }
      }}
    >
      <h3 className='text-center bg-purple-500 text-white font-semibold py-3 mb-3 rounded'>Edit Note</h3>
      <form>
        <p className='text-center text-purple-600 font-semibold'>Title</p>
        <input 
          className='w-full px-2 border-2 border-purple-700 rounded focus:text-purple-600'
          type='text' 
          name='noteTitle' 
          value={selectedNote.noteTitle} 
          onChange={setContent} />
        <p className='text-center text-purple-600 font-semibold'>Description</p>
        <textarea 
          className='w-full h-40 resize-none px-2 border-2 border-purple-700 rounded focus:text-purple-600'
          name='noteDescription' 
          value={selectedNote.noteDescription} 
          onChange={setContent} />
      </form>
      <button
        className='rounded bg-purple-500 text-white px-3 py-1 mx-auto hover:bg-purple-600'
        onClick={handleSaveNote}>Save</button>
    </Modal>
  )

}