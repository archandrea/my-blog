const app = require('../app')
const http = require('http')
const { Server } = require('socket.io')
const { ws_port, WS_URL } = require('../config')
const { getTempId } = require('./tools')

let WSServer = http.Server(app)

const users = {}

const io = new Server(WSServer, { transports: ['websocket'] });

io.on("connection", (socket) => {
  console.log(`id:${socket.id}  connected in!!!`)

  socket.on('online', ({ uid, name }) => {
    if (users[uid]) {
      users[uid].socket.disconnect()
      return
    }
    console.log(name + ' online!!!')
    users[uid] = {
      uid,
      name,
      socket,
      date: new Date().toString()
    }
    socket.name = name
    socket.uid = uid
    socket.ghost = false
  })

  socket.on('enter chatroom', ({ uid = getTempId(), name }) => {
    if (!users[uid]) {
      users[uid] = {
        uid,
        name,
        socket,
        date: new Date().toString()
      }
      socket.uid = uid
      socket.ghost = true
    }
    socket.emit('verified')
    socket.emit('msg from server', "欢迎来到聊天室!");
    io.sockets.emit('info', { msg: name + ' 用户已登录', date: new Date().toString() })
  })

  //离开聊天室
  socket.on('leave', () => {
    let uid = socket.uid
    if (socket.ghost) {
      socket.disconnect()
      delete users[uid]
    }
    socket.emit('logout')
    io.sockets.emit('info', { msg: socket.name + ' 用户已登出', date: new Date().toString() })
  })

  //如果客户端断开连接
  socket.on('disconnect', () => {
    console.log(`id:${socket.id}  disconnected!!!`)
    let uid = socket?.uid
    if (uid && users[uid]) {
      delete users[uid]
      io.sockets.emit('info', { msg: socket.name + ' 用户已登出', date: new Date().toString() })
    }
  })

  socket.on("msg to server", (msg) => {
    socket.broadcast.emit('chat', {
      name: socket.name,
      msg,
      date: new Date().toString()
    })
  });
});

WSServer.listen(ws_port);
