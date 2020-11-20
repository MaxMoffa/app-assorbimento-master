const timestamp = {
    timestamp: null
}

export const timeStampReducer = (state = timestamp, action) => {
  switch (action.type) {

    case 'UPDATE_TIMESTAMP': {
      state = { timestamp: action.timestamp};
      break;
    }

    default:
      return state;
      
  }
  return state;
};
