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
          SET_NOTE_CONTENT, 
          SET_GROUP_INFO,
          SET_GROUP_MEMBERS,
          SET_GROUP_NOTES,
          SET_GROUP_CODE} from '../types'

export default function (state, action) {
  const { payload, type } = action

  switch (type) {
    case GET_NOTES:
      return {
        ...state,
        notes: payload
      }
    case SET_GROUP_CODE:
      return {
        ...state,
        groupCode: payload
      }
    case SET_GROUP_INFO:
      return {
        ...state,
        selectedGroupInfo: payload
      }
    case SET_GROUP_MEMBERS:
      return {
        ...state,
        selectedGroupMembers: payload
      }
    case SET_GROUP_NOTES:
      return {
        ...state,
        selectedGroupNotes: payload
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