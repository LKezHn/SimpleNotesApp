import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

import GroupItem from '../GroupItem'
import JoinModal from '../JoinModal'
import CreateGroupModal from '../CreateGroupModal';

import NotesContext from '../../context/Notes/NotesContext';

function Groups() {

  const { openJoinModal, openCreateModal } = useContext(NotesContext);

  const apiUri = 'http://localhost:4000/api/v1/groups';
  const token = localStorage.getItem('token');

  const [groupList, setGroupList] = useState([])

  useEffect(() => {
    getGroups()
  }, [])

  const getGroups = () => {
    axios.get(apiUri, {
      headers: {
        'x-access-token': token
      }
    }).then(
      res => setGroupList(res.data)
    ).catch(
      err => console.error(err)
    )
  }

  const joinModal = () => {
    openJoinModal()
  }

  const createGroupModal = () => {
    openCreateModal()
  }

  return (
    <div className='lg:w-1/5 mx-1'>
      <div className='bg-purple-500 rounded'>
        <p className='text-white text-center font-semibold'>Your Group</p>
      </div>
      {
        groupList.length > 0 && groupList.map((group) => (
          <GroupItem key={group._id} group={group} />
        ))
      }
      { groupList.length == 0 && <p className=' text-center font-medium text-purple-500 '>You have not any group.</p>}
      <p className='px-2 text-purple-600 hover:text-purple-800 hover:underline text-center text-sm cursor-pointer' onClick={joinModal}>Join to a group</p>
      <JoinModal get={getGroups} />
      <p className='px-2 text-purple-600 hover:underline hover:text-purple-800 text-center text-sm cursor-pointer' onClick={createGroupModal}>Create a group</p>
      <CreateGroupModal get={getGroups} />
    </div>
  )
}

export default Groups;