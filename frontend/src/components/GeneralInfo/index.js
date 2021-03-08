import React, {  useContext ,useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import NotesContext from '../../context/Notes/NotesContext';

import Note from '../Note';
import UserInfo from '../UserInfo';

function GeneralInfo(props) {

  const token = localStorage.getItem('token')
  const { getNotes, notes } = useContext(NotesContext)

  useEffect(() => {
    getNotes(token);
  }, [])

  return (
    <>
      <div className=' mx-1 lg:w-1/5'>
        <p className='text-white bg-purple-500 text-center font-semibold rounded'>Last Notes Added</p>
        {notes.length > 0 && notes.map((note) => (
          <Note key={note._id} id={note._id} content={note} />
          ))}
        { notes.length === 0 && <p className=' text-center font-medium text-purple-500 '>You have no notes in this moment.</p>}
        <UserInfo />
      </div>
    </>
  )
}

export default withRouter(GeneralInfo);
