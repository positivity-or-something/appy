import axios from 'axios'
import moment from 'moment'


const initialState = {
  users: [],
  userId: ''
}

const GET_USERS = 'GET_USERS'
const SET_USER = 'SET_USER'

export default function(state = initialState, action){
  console.log(action.payload)
  switch (action.type) {
    case `${GET_USERS}_FULFILLED`:
      return{
        ...state,
        users: action.payload
      }
      case SET_USER:
      return{
        ...state,
        userId: action.payload
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