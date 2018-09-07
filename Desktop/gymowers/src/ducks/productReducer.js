import axios from 'axios'

const initialState = {
  mowers: [],
  blades: [],
  isLoading: false
}

const GET_MOWERS = 'GET_MOWERS'
const GET_BLADES = 'GET_BLADES'

export default function(state = initialState, action){
  switch (action.type) {
    case `${GET_MOWERS}_FULFILLED`:{
      return{
        ...state,
        mowers: action.payload.data,
        isLoading: false
      }
    }case `${GET_MOWERS}_PENDING`:{
      return{
        ...state,
        isLoading: true
      }
    }
    case `${GET_BLADES}_FULFILLED`:{
      return{
        ...state,
        blades: action.payload.data,
        isLoading: false
      }
    }case `${GET_BLADES}_PENDING`:{
      return{
        ...state,
        isLoading: true
      }
    }
  
    default:
      return state;
  }
}

export function getMowers(){
  return{
    type: GET_MOWERS,
    payload: axios('/api/mowers')
  }
}
export function getBlades(){
  return{
    type: GET_BLADES,
    payload: axios('/api/blades')
  }
}