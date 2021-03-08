import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function UserInfo() {

  const token = localStorage.getItem('token');
  const apiUrl = 'http://localhost:4000/api/v1/me';
  const history = useHistory()
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    axios.get(apiUrl, {
      headers: {
        'x-access-token': token
      }
    }).then((res) => {
      setUserInfo(res.data)
    }).catch(err => history.push('/'))
  }, [])

  return (
    <>
      <p className='text-white bg-purple-500 text-center font-semibold rounded'>Your Profile Info</p>
      <div className=' mx-2 my-1 py-1 px-4 rounded border border-purple-600 bg-gray-100 text-left'>
        <span className="text-purple-600 font-medium text-sm">Username: </span><span className='text-sm font-light text-purple-900'>{userInfo.username}</span><br/>
        <span className="text-purple-600 font-medium text-sm">Email: </span><span className='text-sm font-light text-purple-900'>{userInfo.email}</span>
      </div>
    </>
  )
}

export default UserInfo;