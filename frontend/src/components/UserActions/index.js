import React from 'react';

import CreateNote from '../CreateNote';

function UserActions({ addedHandler }) {

  return (
    <div className='lg:w-3/5 mx-1 lg:m-0'>
      <div className='bg-purple-500 rounded'>
        <p className='text-white text-center font-semibold '>UserActions</p>
      </div>
      <div className='flex flex-col md:justify-center lg:flex-row px-2 py-2 my-2 md:my-10'>
        <div className='w-4/5 text-center mx-auto text-purple-500 bg-white rounded border-1 border-purple-600'><CreateNote handler={addedHandler} /></div>
      </div>
    </div>
  )

}

export default UserActions;