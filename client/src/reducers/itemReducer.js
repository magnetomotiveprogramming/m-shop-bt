//reducer is where our actual state is going to go and this is where we check our actions
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from '../actions/types';

// import uuid from 'uuid';

const initialState = {
  items: [
    // { id: uuid(), name: 'Eggs'},
    // { id: uuid(), name: 'Milk'},
    // { id: uuid(), name: 'Steak'},
    // { id: uuid(), name: 'Candy'}
  ],
  loading: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case DELETE_ITEM:
      return {
        ...state,
        items:state.items.filter(item => item._id !== action.payload)
      };
    case ADD_ITEM:
      return {
        ...state,
        items:[action.payload, ...state.items]
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}

