import React, { useState, useContext } from 'react';
import axios from 'axios';

import NotesContext from '../../context/Notes/NotesContext';

function CreateNote() {

  const { getNotes } = useContext(NotesContext);
  const notesUrl = 'http://localhost:4000/api/v1/createNote';
  const [noteContent, setNoteContent] = useState({ noteTitle: "", noteDescription: "" });
  const token = localStorage.getItem('token')

  const handleNoteData = (e) => {
    setNoteContent({ ...noteContent, [e.target.id]: e.target.value });
  }

  const addNote = (e) => {
    e.preventDefault();
    axios.post(notesUrl, noteContent, {
      headers: {
        'x-access-token': token
      }
    }
    ).then((res) => {
      getNotes(token)
      setNoteContent({ noteTitle: "", noteDescription: "" })
    })
      .catch(err => console.error('error'))
  }

  return (
    <>
      <div className=''>
        <form onSubmit={addNote} className='bg-white text-purple-600 shadow-xl rounded px-2 py-5'>
          <p className='mx-12 text-left text-lg font-semibold'>Add a Note</p>
          <label
            className='block text-sm text-purple-500 font-semibold text-center'
            htmlFor='noteTitle'>Title
          </label>
          <input
            type="text"
            value={noteContent.noteTitle}
            id='noteTitle'
            onChange={handleNoteData}
            className='focus:text-purple-600 w-5/6 bg-gray-400 px-3 py-1 text-gray-700 text-sm font-medium rounded' />
          <label className='block text-sm text-purple-500 font-semibold text-center' htmlFor='noteDescription'>Description</label>
          <textarea
            id='noteDescription'
            value={noteContent.noteDescription}
            onChange={handleNoteData}
            className='bg-gray-400 w-5/6 h-24 px-3 py-1 text-gray-700 text-sm font-medium rounded resize-none' />
          <button type='submit' className='my-2 block text-sm bg-purple-500 text-white px-3 py-1 rounded mx-auto'>Add Note</button>
        </form>
      </div>
    </>
  )
}

export default CreateNote;