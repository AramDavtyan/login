export default (state = [], action) => {
  switch (action.payload) {
    case 'CREATE_USER':
      return action.payload
    default:
      return state
  }
}