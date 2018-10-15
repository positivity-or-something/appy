import axios from 'axios'
import moment from 'moment'


const initialState = {
  users: []
}

const GET_USERS = 'GET_USERS'

export default function(state = initialState, action){
  console.log(action.payload)
  switch (action.type) {
    case `${GET_USERS}_FULFILLED`:
      return{
        ...state,
        users: action.payload
      }
    default:
      return state
  }
}

export function getUsers(){
  return{
    type: GET_USERS,
    payload: axios(`http://localhost:3001/api/users`)
  }
}