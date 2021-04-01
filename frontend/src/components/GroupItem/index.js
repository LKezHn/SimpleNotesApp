import React, { useContext, useEffect } from 'react';
import GroupModalWindow from '../GroupModalWindow';
import axios from 'axios';

import NotesContext from '../../context/Notes/NotesContext';

export default function GroupItem({ group }) {

  const apiUri = 'http://localhost:4000/api/v1/groups';
  const token = localStorage.getItem('token');
  const { openGroupModal, setSelectedGroupInfo } = useContext(NotesContext);

  const setGroups = () => {
    axios.get(`${apiUri}/${group.code}`, {
      headers: {
        'x-access-token': token
      }
    }).then((res) => {
      setSelectedGroupInfo(res.data)
    }
    ).catch(err => console.error(err))
  }
  
  const open = (e) => {
    openGroupModal()
    setGroups()
  }

  return (
    <div id={group.code} key={group._id} className='mx-2 my-1 py-1 px-4 rounded border border-purple-600 bg-gray-100 text-left'>
      <span onClick={open} className='cursor-pointer hover:underline text-sm font-normal text-purple-900'>{group.name}</span><br />
      <span className='text-xs font-light text-gray-600'>{group.code}</span>
      <GroupModalWindow />
    </div>
  )

}