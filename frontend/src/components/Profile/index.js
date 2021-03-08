import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'

import NotesContext from '../../context/Notes/NotesContext'

import GeneralInfo from '../GeneralInfo';
import UserActions from '../UserActions';
import Groups from '../Groups';

function Profile(props) {

  const userInfoUrl = 'http://localhost:4000/api/v1/me';
  const { clearNotes } = useContext(NotesContext)
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get(userInfoUrl, {
      headers: {
        'x-access-token': token
      }
    }).then(res => {
      setUserData(res.data);
    }).catch(err => props.history.push('/'))
  }, []);

  const logoutUser = (e) =>{
    e.preventDefault()
    clearNotes()
    localStorage.removeItem('token')
    props.history.push('/')
  }

  return (
    <div className=' p-0 m-0 bg-gray-300 h-screen overflow-scroll md:overflow-hidden'>
      <div className='flex flex-row bg-purple-500 px-5 py-6 mb-1'>
        <div className='w-2/3'>
          <p className="text-left font-semibold text-white sm:text-lg md:text-xl">¡Welcome {userData.username}!</p>
        </div>
        <div className='w-1/3 text-right'>
          <button onClick={logoutUser} className='border-1 border-white text-xs md:text-base text-white px-1'>Logout</button>
        </div>
      </div>
      <div className='flex mb-3 flex-col lg:flex-row h-full'>
        <GeneralInfo />
        <UserActions />
        <Groups />
      </div>
    </div>
  )

}

export default withRouter(Profile);