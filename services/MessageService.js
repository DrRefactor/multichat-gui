

export const MessageService = {
  messages: [
    {
      id: 'a',
      date: new Date('01/01/2018'),
      text: "Test",
      out: true
    },
    {
      id: 'b',
      date: new Date('01/02/2018'),
      text: "Test 2",
      out: false
    },
    {
      id: 'c',
      date: new Date('01/03/2018'),
      text: "Test 31323123123 Test 31323123123 Test 31323123123 Test 31323123123 Test 31323123123",
      out: true
    },
    {
      id: 'd',
      date: new Date('01/02/2018'),
      text: "Test 2",
      out: false
    },
    {
      id: 'e',
      date: new Date('01/02/2018'),
      text: "Test 2",
      out: false
    },
    {
      id: 'F',
      date: new Date('01/02/2018'),
      text: "Test 2",
      out: false
    },
    {
      id: 'G',
      date: new Date('01/02/2018'),
      text: "Test 2",
      out: false
    },
  ],
  getMessages: function() {
    return Promise.resolve(this.messages)
  },
  postMessage: async function(text) {
    await this.delay(1000)
    this.messages.push({
      text,
      date: new Date(),
      id: Math.random() + '',
      out: true
    })
    return Promise.resolve()
  },
  delay: function(ms) {
    return new Promise((resolve) => {
      setTimeout(
        () => resolve(),
        ms
      )
    })
  }
}