import axios from 'axios'
import moment from 'moment'

const initialState = {
  state: true
}

const GET_STATE = 'GET_STATE'

export default function(state = initialState, action){
  switch (action.type) {
    case GET_STATE:
      return{
        ...state
      }
    default:
      return state
  }
}

export function getState(){
  return{
    type: GET_STATE,
    payload: ''
  }
}