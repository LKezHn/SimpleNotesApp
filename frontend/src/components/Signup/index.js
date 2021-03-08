import React, { useState } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';

import axios from 'axios';

function Signup() {

  const [userData, setUserData] = useState({username: '', email: '', password: ''});
  const apiUrl = 'http://localhost:4000/api/v1/signup'
  const history = useHistory();

  const handleChangeData = (event) => {
    setUserData({ ...userData, [event.target.id]: event.target.value})
  }

  const handleSendData = (event) =>{
    event.preventDefault();
    axios.post(apiUrl, userData).then( (res) =>{
      localStorage.setItem('token', res.data.token)
      history.push('/me')
    }).catch( err => console.error('Error'))
  }

  return (
    <div className='h-screen w-screen bg-gray-300'>
      <div className='flex justify-center mx-auto'>
        <form onSubmit={handleSendData} className='bg-gray-100 text-black mt-40 shadow-xl rounded px-10 py-5'>
          <p className='text-xl font-semibold'>Signup</p>
          <label className='block text-sm text-gray-800 font-semibold text-center' htmlFor='username'>Username</label>
          <input type="text" onChange={handleChangeData} id='username' className='focus:text-purple-600 bg-gray-400 px-3 py-1 text-gray-700 text-sm font-medium rounded' />
          <label className='block text-sm text-gray-800 font-semibold text-center' htmlFor='email'>Email</label>
          <input type="email" onChange={handleChangeData} id='email' className='bg-gray-400 px-3 py-1 text-gray-700 text-sm font-medium rounded' />
          <label className='block text-sm text-gray-800 font-semibold text-center' htmlFor='password'>Password</label>
          <input type="password" onChange={handleChangeData} id='password' className='bg-gray-400 px-3 py-1 text-gray-700 text-sm font-medium rounded' />
          <button type='submit' className='my-2 block text-sm bg-purple-500 text-white px-3 py-1 rounded mx-auto'>Sign Up</button>
          <p className="text-sm font-thin">Are you registered? <Link to='/login' className='text-purple-600 font-medium'>Login</Link></p>
        </form>
      </div>
    </div>
  )
}

export default withRouter(Signup);