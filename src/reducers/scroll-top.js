const initialState = {};

export default function(state=initialState, action) {
  switch (action.type) {
    case "SET_SCROLL_TOP":
      return {...state, [action.pathname]: action.scrollTop };
  }
  return state;
}