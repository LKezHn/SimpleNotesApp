import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

import NotesContext from '../../context/Notes/NotesContext'

function GroupModalWindow() {

  const { setSelectedGroupInfo, selectedGroupMembers, selectedGroupNotes, selectedGroupInfo, modalGroupStatus, closeGroupModal } = useContext(NotesContext);
  const apiUri = 'http://localhost:4000/api/v1/groups';
  const token = localStorage.getItem('token');

  const [newNote, setNewNote] = useState({ noteTitle: "", noteDescription: "" })

  const setGroups = (id, apiUri) => {
    axios.get(`${apiUri}/${selectedGroupInfo.code}`, {
      headers: {
        'x-access-token': token
      }
    }).then((res) => {
      setSelectedGroupInfo(res.data)
    }
    ).catch(err => console.error(err))
  }

  const deleteNote = (e) => {
    e.preventDefault()
    axios.delete(`${apiUri}/${selectedGroupInfo.code}/notes/${e.target.id}`,{
      headers: {
        'x-access-token': token
      }
    }).then( res => {
      setGroups(selectedGroupInfo.code, apiUri)
    }).catch( err => console.error(err))
  }

  const handleNewNote = (e) => {
    setNewNote({ ...newNote, [e.target.name]: e.target.value })
  }

  const addNewGroupNote = (e) => {
    e.preventDefault()
    console.log(newNote)
    axios.post(`${apiUri}/${selectedGroupInfo.code}/newNote`, newNote, {
      headers: {
        'x-access-token': token
      }
    }).then((res) => {
      setNewNote({ noteTitle: "", noteDescription: "" })
      setGroups(selectedGroupInfo.code, apiUri)
    }
    ).catch(err => console.error(err))
  }

  return (
    <Modal
      ariaHideApp={false}
      isOpen={modalGroupStatus}
      contentLabel='Groups'
      onRequestClose={closeGroupModal}
      style={{
        overlay: {
          backgroundColor: 'rgba(255, 255, 255, 0.5)'
        },
        content: {
          backgroundColor: '#F3F4F6',
          border: '1px solid #7C3AED',
          height: '75%',
          width: '80%',
          margin: 'auto auto'
        }
      }}
    >
      <p className='text-center my-1 mr-0 px-2 py-1 bg-red-500 text-white rounded'>Press ESC to Exit</p>
      <h1 className="text-xl text-center font-semibold text-purple-600">{selectedGroupInfo.name}</h1>
      <p className='text-center text-md text-gray-600 font-medium'>Code: {selectedGroupInfo.code}</p>
      <div className='my-4 mx-2'>
        <h1 className='text-center bg-purple-400 text-white rounded'>Add a note</h1>
        <form className='px-auto justify-center'>
          <input className='justify-center bg-gray-300 w-full px-3 py-1 my-2 text-purple-600' type='text' name='noteTitle' value={newNote.noteTitle} onChange={handleNewNote} placeholder='Note title' />
          <textarea
            placeholder='Note Description'
            name='noteDescription'
            value={newNote.noteDescription}
            onChange={handleNewNote}
            className='bg-gray-300 w-full h-24 px-3 py-1 text-purple-600 text-sm font-medium rounded resize-none' />
        </form>
        <button id={selectedGroupInfo.code} type='button' onClick={addNewGroupNote} className='my-2 block text-sm bg-purple-500 text-white px-3 py-1 rounded mx-auto'>Add Note</button>
      </div>
      <div className='flex flex-row'>
        <div className='w-1/4'>
          <h1 className='bg-purple-400 text-white rounded m-1 text-center' onClick={() => console.log(selectedGroupInfo)}>Users</h1>
          {
            selectedGroupMembers.map((member) => (
              <div className='bg-white border mx-2 my-1 border-purple-600 rounded text-gray-600 font-medium px-2' key={member._id}>{member.username}</div>
            ))
          }
        </div>
        <div className='w-3/4'>
          <h1 className='bg-purple-400 text-white rounded m-1 text-center'>Notes</h1>
          {
            selectedGroupNotes.length > 0 && selectedGroupNotes.map((note) => (
              <div className='bg-white border mx-2 my-1 border-purple-600 rounded text-gray-600 font-medium px-2' key={note._id}>
                <div className='float-right'>
                  <button id={note._id} className='text-purple-500 m-0 px-1 text-md font-bold' onClick={deleteNote}>x</button>
                </div>
                <h1 className='text-purple-500 text-md'>{note.noteTitle}</h1>
                <h1 className='text-purple-700 text-sm'>{note.noteDescription}</h1>
                <h3 className=' text-gray-600 text-xs font-light'>Author: {note.author.username}</h3>
              </div>
            ))
          }
        </div>
      </div>
    </Modal>
  )
}

export default GroupModalWindow;