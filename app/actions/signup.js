


export default dispatch => {
  return {
    create: (response) => {
      return dispatch({
        type: 'CREATE_USER',
        payload: fetch('http://localhost:3000/api/v1/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(response)
        })
          .then((response) => {
            if (!response.ok) return response.json().then(err => err)
            return response.json().then((response) => response)
          })
      })
    }
  }
}
