let config = {
    port: 8001,
    redis: {
        host: "127.0.0.1",
        port: "6379",
        passwordExpiry:10
    },
    googleConfig : {
        clientId: '332802590420-irqfv289futj354ctkf4ufq3rccec41h.apps.googleusercontent.com', // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
        clientSecret: '6JJO7h9PTbiPMStM3pBwBT9Q', // e.g. _ASDFA%DFASDFASDFASD#FAD-
        redirect: 'http://127.0.0.1:4200' // this must match your google api settings
      }
}

module.exports = config;
