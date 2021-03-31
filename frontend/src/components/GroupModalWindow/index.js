import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useEffect } from 'react';

function GroupModalWindow({ status, id }) {

  const apiUri = 'http://localhost:4000/api/v1/groups';
  const token = localStorage.getItem('token');

  const [groupInfo, setGroupInfo] = useState({})
  const [members, setMembers] = useState([])
  const [groupNotes, setGroupNotes] = useState([])

  useEffect(() => {
    axios.get(`${apiUri}/${id}`, {
      headers: {
        'x-access-token': token
      }
    }).then((res) => {
      setGroupInfo(res.data)
      setMembers(res.data.members)
      setGroupNotes(res.data.notes)
    }
    ).catch(err => console.error(err))
  }, [])

  return (
    <Modal
      ariaHideApp={false}
      isOpen={status}
      contentLabel='Groups'
      onRequestClose={() => { return false }}
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
      <h1 className="text-xl text-center font-semibold text-purple-600">{groupInfo.name}</h1>
      <p className='text-center text-md text-gray-600 font-medium'>Code: {groupInfo.code}</p>
      <div className='flex flex-row'>
        <div className='w-1/3'>
          <h1 className='bg-purple-400 text-white rounded m-1 text-center' onClick={() => console.log(groupNotes)}>Users</h1>
          {
            members.map((member) => (
              <div className='bg-white border mx-2 border-purple-600 rounded text-gray-600 font-medium px-2' key={member._id}>{member.username}</div>
              ) )
            }
        </div>
        <div className='w-2/3'>
          <h1 className='bg-purple-400 text-white rounded m-1 text-center'>Notes</h1>
            {
              groupNotes.length > 0 && groupNotes.map(( note ) => (
                <div className='bg-white border mx-2 border-purple-600 rounded text-gray-600 font-medium px-2' key={note._id}>
                  <h1 className='text-purple-500 text-md'>{note.noteTitle}</h1>
                  <h3 className=' text-gray-600 text-sm font-light'>Author: {note.author.username}</h3>
                </div>
               ))
            }
        </div>
      </div>
    </Modal>
  )
}

export default GroupModalWindow;