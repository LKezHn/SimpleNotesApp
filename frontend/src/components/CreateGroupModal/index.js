import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

import NotesContext from '../../context/Notes/NotesContext';

function CreateGroupModal({ get }) {

  const apiUri = 'http://localhost:4000/api/v1/groups/new';
  const token = localStorage.getItem('token')

  const { modalCreateStatus, closeCreateModal } = useContext(NotesContext);
  const [groupName, setGroupName] = useState("");

  const close = (e) => {
    setGroupName("")
    closeCreateModal()
  }

  const handleGroupName = (e) => {
    setGroupName(e.target.value)
  }

  const createGroup = (e) => {
    e.preventDefault()
    axios.post(apiUri, {name: groupName}, {
      headers : {
        'x-access-token': token
      }
    }).then( res => {
      setGroupName("")
      closeCreateModal()
      get()
    }).catch( err => console.error(err))
  }

  return (
    <Modal
      ariaHideApp={false}
      isOpen={modalCreateStatus}
      contentLabel='Groups'
      onRequestClose={ closeCreateModal }
      style={{
        overlay: {
          backgroundColor: 'rgba(255, 255, 255, 0.5)'
        },
        content: {
          backgroundColor: '#F3F4F6',
          border: '1px solid #7C3AED',
          height: '27%',
          width: '80%',
          margin: 'auto auto'
        }
      }}
      >
        <h1 className='bg-purple-400 py-1 my-2 text-white text-center font-semibold rounded'>Create a Group</h1>
        <input type='text' value={groupName} onChange={handleGroupName} className='w-full bg-gray-300 text-purple-600 py-1 px-2' placeholder='Group Name' name='name' />
        <button type='button' onClick={createGroup} className='mx-2 bg-purple-500 text-white px-2 py-1 my-1 rounded'>Create</button>
        <button type='button' onClick={close} className='hover:bg-red-600 bg-red-500 text-white px-2 py-1 my-1 rounded'>Cancel</button>
    </Modal>
  )
}

export default CreateGroupModal;