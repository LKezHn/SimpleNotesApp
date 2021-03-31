import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import GroupModalWindow from '../GroupModalWindow';
import JoinModal from '../JoinModal'

import NotesContext from '../../context/Notes/NotesContext';

function Groups() {

  const { openGroupModal, openJoinModal } = useContext(NotesContext);

  const apiUri = 'http://localhost:4000/api/v1/groups';
  const token = localStorage.getItem('token');

  const [groupList, setGroupList] = useState([])

  useEffect(() => {
    axios.get(apiUri, {
      headers: {
        'x-access-token': token
      }
    }).then(
      res => setGroupList(res.data)
    ).catch(
      err => console.error(err)
    )
  }, [])

  const open = (e) => {
    e.preventDefault()
    openGroupModal()
  }

  const joinModal = () => {
    openJoinModal()
  }

  return (
    <div className='lg:w-1/5 mx-1'>
      <div className='bg-purple-500 rounded'>
        <p className='text-white text-center font-semibold'>Your Group</p>
      </div>
      {
        groupList.length > 0 && groupList.map((group) => (
          <div key={group._id} onClick={open} className='mx-2 my-1 py-1 px-4 rounded border border-purple-600 bg-gray-100 cursor-pointer text-left'>
            <span className='text-sm font-normal text-purple-900'>{group.name}</span><br/>
            <span className='text-xs font-light text-gray-600'>{group.code}</span>
            <GroupModalWindow  id={group.code}/>
          </div>
        ))
      }
      { groupList.length == 0 && <p className=' text-center font-medium text-purple-500 '>You have not any group.</p>} 
      <p className='px-2 text-purple-600 text-center text-sm cursor-pointer' onClick={joinModal}>Join to a group</p>
      <JoinModal />
      {/* <p className='px-2 text-purple-600 text-center text-sm cursor-pointer' onClick={createGroupModal}>Create a group</p> */}
    </div>
  )
}

export default Groups;