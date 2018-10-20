import axios from 'axios'

const initialState = {
  users: [],
  userId: '',
  content: []
}

const GET_USERS = 'GET_USERS'
const SET_USER = 'SET_USER'
const UPDATE_CONTENT = 'UPDATE_CONTENT'
const DELETE_POST = 'DELETE_POST'

export default function(state = initialState, action){
  switch (action.type) {
    case `${GET_USERS}_FULFILLED`:
      return{
        ...state,
        users: action.payload.data
      }
      case SET_USER:
      return{
        ...state,
        userId: action.payload
      }
      case UPDATE_CONTENT:
      return{
        ...state,
        content: action.payload
      }
      case `${DELETE_POST}_FULFILLED`:
      return{
        ...state,
        content: action.payload.data
      }
    default:
      return state
  }
}

export function setUser(id){
  return{
    type: SET_USER,
    payload: id
  }
}

export function getUsers(){
  return{
    type: GET_USERS,
    payload: axios(`http://localhost:3001/api/users`)
  }
}

export function updateContent(content){
  return{
    type: UPDATE_CONTENT,
    payload: content
  }
}

export function deletePost(postId){
  return{
    type: DELETE_POST,
    payload: axios.delete(`http://localhost:3001/api/deletepost/${postId}`)
  }
}