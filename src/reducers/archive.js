export default function(state={}, action) {
  switch (action.type) {
    case "SELECT_ENTRY":
      return {...state, ...action.entryData};
    default:
      return state;
  }
}
