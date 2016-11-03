export default function(state={}, action) {
  switch (action.type) {
    case "ENTRY_PENDING":
      return {};
    case "SELECT_ENTRY":
      return {...state, ...action.entryData};
    default:
      return state;
  }
}
