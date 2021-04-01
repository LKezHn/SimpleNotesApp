import React, {useContext, useState} from 'react';
import Modal  from 'react-modal';
import axios from 'axios';

import NotesContext from '../../context/Notes/NotesContext'

function JoinModal({ get }) {

  const apiUri = 'http://localhost:4000/api/v1/groups';
  const token = localStorage.getItem('token')
  const { modalJoinStatus, closeJoinModal } = useContext(NotesContext);

  const [groupCode, setGroupCode] = useState("")
  const [error, setError] = useState("")
  
  const handleGroupCode = (e) => {
    setGroupCode(e.target.value)
  }

  const joinGroup = (e) => {
    e.preventDefault()
    axios.post(`${apiUri}/${groupCode}/join`, {
    }, { headers: {
      'x-access-token': token 
    }}).then( res => {
      setGroupCode("")
      closeJoinModal()
      get()
    } ).catch( err => {
      setError("Group code incorrect!")
    })
  }

  const close = (e) => {
    setGroupCode("")
    closeJoinModal()
  }
 
  return (
    <Modal
      ariaHideApp={false}
      isOpen={modalJoinStatus}
      contentLabel='Groups'
      onRequestClose={ closeJoinModal }
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
        <h1 className='bg-purple-400 py-1 my-2 text-white text-center font-semibold rounded'>Join to a Group</h1>
        <input type='text' value={groupCode} onChange={handleGroupCode} className='w-full bg-gray-300 text-purple-600 py-1 px-2' placeholder='Group Code' name='code' />
        <button type='button' onClick={joinGroup} className='mx-2 bg-purple-500 text-white px-2 py-1 my-1 rounded'>Join</button>
        <button type='button' onClick={close} className='hover:bg-red-600 bg-red-500 text-white px-2 py-1 my-1 rounded'>Cancel</button>
        <h2 className='text-purple-500'>{error}</h2>
    </Modal>
  )

}

export default JoinModal;