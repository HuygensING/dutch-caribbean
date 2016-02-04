export default function(state={}, action) {
  switch (action.type) {
    case "SELECT_ENTRY":
      return {...state, ...action.data};
    default:
      return state;
  }
}
