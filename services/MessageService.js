import stomp from 'webstomp-client'
import SockJS from 'sockjs-client'

const URL = "https://multichat-java.azurewebsites.net"

export const MessageService = {
  getMessages: (sessionId = "", chatRoom = "", page = 0, size = 20) => {
    return fetch(URL + "/users/" + sessionId + "/chats/" + chatRoom + "?page=" + page + "&size=" + size)
      .then(res =>  res.json())
      .then(res => {
        res.content.sort((a, b) => a.timestamp > b.timestamp)
        return res
      })
  },
  connect: (chatRoom = "", onMessage = () => {}) => {
    const socket = new SockJS(URL + '/chat')
    const client = stomp.over(socket, { protocols: ['v10.stomp'] })

    return new Promise((resolve, reject) => {
      client.connect(
        {},
        frame => {
          console.log('Connected: ' + frame)
          const sessionId = /\/([^\/]+)\/websocket/.exec(socket._transport.url)[1]
          client.subscribe('/user/' + sessionId + '/chat/' + chatRoom, onMessage);
          resolve({ client, sessionId })
        },
        error => {
          reject(error)
        }
      );
    })
  },
}