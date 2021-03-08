import { CLOSE_MODAL, GET_NOTES, SET_SELECTED_NOTE, OPEN_MODAL, SET_NOTE_CONTENT } from '../types'

export default function (state, action) {
  const { payload, type } = action

  switch (type) {
    case GET_NOTES:
      return {
        ...state,
        notes: payload
      }
    case OPEN_MODAL:
      return{
        ...state,
        modalStatus: payload
      }
    case CLOSE_MODAL:
      return{
        ...state,
        modalStatus: payload
      }
    case SET_SELECTED_NOTE:
      return{
        ...state,
        selectedNote: payload
      }
    case SET_NOTE_CONTENT:
      return{
        ...state,
        selectedNote:
          payload
      }
    default:
      return state
  }
}