export default function socketListen(socket) {
  const listeners = {
    'msg from server': (message) => {
      this.$notify.info({
        title: '聊天室公告',
        message,
      })
    },
    'verified': () => {
      console.log(this)
      this.isLogin = true
      this.dialogVisible = false
    },
    'info': (data) => {
      this.records.push({ ...data, type: 'info' })
    },
    'chat': (data) => {
      this.records.push({ ...data, type: 'msg' })
    },
    'logout': () => {
      this.isLogin = false
    },
    'name already exist': () => {
      this.$notify.error({
        title: '错误',
        message: '用户名已经存在',
      })
    },
  }

  for(const key in listeners) {
    socket.on(key, listeners[key])
  }
  

  return function() {
    for(const key in listeners) {
      socket.off(key, listeners[key])
    }
  }
}

// socket.on('msg from server', (message) => {
//   this.$notify.info({
//     title: '聊天室公告',
//     message,
//   })
// })

// socket.on('verified', () => {
//   console.log(this)
//   this.isLogin = true
//   this.dialogVisible = false
// })

// socket.on('info', (data) => {
//   this.records.push({ ...data, type: 'info' })
// })

// socket.on('chat', (data) => {
//   this.records.push({ ...data, type: 'msg' })
// })

// socket.on('logout', () => {
//   this.isLogin = false
// })

// socket.on('name already exist', () => {
//   this.$notify.error({
//     title: '错误',
//     message: '用户名已经存在',
//   })
// })