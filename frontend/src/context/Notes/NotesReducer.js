import { 
          CLOSE_MODAL,
          CLOSE_GROUP_MODAL,
          CLOSE_CREATE_MODAL,
          CLOSE_JOIN_MODAL, 
          GET_NOTES, 
          SET_SELECTED_NOTE, 
          OPEN_CREATE_MODAL,
          OPEN_GROUP_MODAL, 
          OPEN_JOIN_MODAL, 
          OPEN_MODAL, 
          SET_NOTE_CONTENT } from '../types'

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
    case OPEN_GROUP_MODAL:
      return{
        ...state,
        modalGroupStatus: payload
      }
    case OPEN_CREATE_MODAL:
      return{
        ...state,
        modalCreateStatus: payload
      }
    case OPEN_JOIN_MODAL:
      return{
        ...state,
        modalJoinStatus: payload
      }
    case CLOSE_MODAL:
      return{
        ...state,
        modalStatus: payload
      }
    case CLOSE_GROUP_MODAL:
      return{
        ...state,
        modalGroupStatus: payload
      }
    case CLOSE_JOIN_MODAL:
      return{
        ...state,
        modalJoinStatus: payload
      }
    case CLOSE_CREATE_MODAL:
      return{
        ...state,
        modalCreateStatus: payload
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