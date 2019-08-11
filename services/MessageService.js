import stomp from 'webstomp-client'
import SockJS from 'sockjs-client'
import { StorageService } from './StorageService';

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
  connect: async (chatRoom = "", onMessage = () => {}) => {
    const storedSessionId = await StorageService.getSessionId()
    const options = storedSessionId ? { sessionId: () => storedSessionId } : {}
    const socket = new SockJS(URL + '/chat', [], options)
    const client = stomp.over(socket, { protocols: ['v10.stomp'] })

    return new Promise((resolve, reject) => {
      client.connect(
        {},
        async frame => {
          const sessionId = /\/([^\/]+)\/websocket/.exec(socket._transport.url)[1]
          console.log('Connected', sessionId)
          if(!storedSessionId) {
            await StorageService.saveSessionId(sessionId)
          }
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