export default (state = [], action) => {
  switch (action.payload) {
    case 'LOGIN':
      return action.payload
    default:
      return state
  }
}
