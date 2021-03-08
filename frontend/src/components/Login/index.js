import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';

import axios from 'axios';

function Login(props) {

  const apiURL = 'http://localhost:4000/api/v1/login'
  const tokenAuthURL = 'http://localhost:4000/api/v1/verifyToken'
  const [userData, setUserData] = useState({ username: "", password: "" });
  const [status, setStatus] = useState("hidden");

  const verifyToken = function (token) {
    axios.post(tokenAuthURL, {}, {
      headers: {
        'x-access-token': token
      }
    }).then(res => {
      props.history.push('/me')
    }).catch(err => console.error('Error'))
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken(token);
    }
  }, [])

  const handleChangeData = (event) => {
    setUserData({ ...userData, [event.target.id]: event.target.value })
  }

  const handleSendData = (event) => {
    event.preventDefault();
    if (userData.username === "" || userData.password === "") {
      setStatus("block text-red-500 font-semibold text-xs")
      setTimeout(() => {
        setStatus("hidden");
      }, 1000)
    }

    axios.post(apiURL, userData).then( (res) => {
        localStorage.setItem('token', res.data.token);
        props.history.push('/me')
      }
    ).catch(err => console.log(err))
  }

  return (
    <div className='h-screen w-screen bg-gray-300'>
      <div className='flex justify-center mx-auto'>
        <form onSubmit={handleSendData} className='bg-gray-100 text-black mt-40 shadow-xl rounded px-10 py-5'>
          <p className='text-xl font-semibold'>Login</p>
          <label className='block text-sm text-gray-800 font-semibold text-center' htmlFor='username'>Username</label>
          <input type="text" onChange={handleChangeData} id='username' className='focus:text-purple-600 bg-gray-400 px-3 py-1 text-gray-700 text-sm font-medium rounded' />
          <label className='block text-sm text-gray-800 font-semibold text-center' htmlFor='password'>Password</label>
          <input type="password" onChange={handleChangeData} id='password' className='bg-gray-400 px-3 py-1 text-gray-700 text-sm font-medium rounded' />
          <button type='submit' className='my-2 block text-sm bg-purple-500 text-white px-3 py-1 rounded mx-auto'>Login</button>
          <p className="text-sm font-thin">Are you not registered? <Link to='/signup' className='text-purple-600 font-medium'>Register now!</Link></p>
          <p className={status}>Missing fields.</p>
        </form>
      </div>
    </div>
  )

}

export default withRouter(Login);