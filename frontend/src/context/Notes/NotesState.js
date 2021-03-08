import React, { useReducer } from 'react';
import NotesReducer from './NotesReducer';
import NotesContext from './NotesContext';

import axios from 'axios';

function UserState(props){

  const notesUrl = 'http://localhost:4000/api/v1/notes';

  const initialState = {
    notes: [],
    selectedNote: {},
    modalStatus: false,
  }

  const [state, dispatch] = useReducer(NotesReducer, initialState)

  const clearNotes = () =>{
    dispatch({
      type: 'GET_NOTES',
      payload: []
    })
  }

  const getNotes = async (token) => {
    const res = await axios.get(notesUrl, {
      headers: {
        'x-access-token': token
      }
    })
    if (res.status === 200){
      if (res.data[0] !== undefined) {
        console.log(res.data[0].notes)
        dispatch({
          type: 'GET_NOTES',
          payload: res.data[0].notes
        })
      } else {
        dispatch({
          type: 'GET_NOTES',
          payload: []
        })
      }
    }else{
      console.error('error')
    }
  }

  const setSelectedNote = (note) =>{
    console.log(note)
    dispatch({
      type: 'SET_SELECTED_NOTE',
      payload: note
    })
  }

  const openModal = () => {
    dispatch({
      type: 'OPEN_MODAL',
      payload: true
    })
  }

  const closeModal = () =>{
    dispatch({
      type: 'CLOSE_MODAL',
      payload: false
    })
  }

  const setSelectedNoteContent = (content) =>{
    dispatch({
      type: 'SET_NOTE_CONTENT',
      payload: content
    }
    )
  }

  return(
    <NotesContext.Provider value={{
      notes: state.notes,
      selectedNote: state.selectedNote,
      modalStatus: state.modalStatus,
      getNotes,
      clearNotes,
      openModal,
      closeModal,
      setSelectedNote,
      setSelectedNoteContent
    }}>
      { props.children }
    </NotesContext.Provider>
  )
}

export default UserState;