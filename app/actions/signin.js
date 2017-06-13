export default dispatch => {
  return {
    login: (response) => {
      return dispatch({
        type: 'LOGIN',
        payload: fetch('http://localhost:3000/api/v1/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(response)
        })
          .then(response => {
            if (!response.ok) return response.json().then(err => err)
            return response.json().then((response) => response)
          })
      })
    }
  }
}
