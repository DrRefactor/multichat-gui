const URL = "https://multichat-java.azurewebsites.net"

export const SessionService = {
  getLanguages: () => {
    return fetch(URL + "/languages/")
      .then(res =>  res.json())
  },
  setLanguage: (sessionId = "", chatRoom = "", language = "") => {
    return fetch(URL + "/users/" + sessionId + "/chats/" + chatRoom, 
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ language })
      })
      .then(res => res.json())
  },
  setUsername: (sessionId = "", username = "") => {
    return fetch(URL + "/users/" + sessionId + "/username", 
    {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ username })
    })
    .then(res => res.json())
  },
  setToken: (sessionId = "", token = "") => {
    return fetch(URL + "/users/" + sessionId + "/token", 
    {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ token })
    })
    .then(res => res.json())
  }
}