<template>
  <div class="blog-chatroom">
    <el-card class="blog-chatroom-main">
      <el-button v-if="!isLogin"
                 @click="login">加入聊天</el-button>
      <div v-if="isLogin"
           class="blog-chatroom-msgBox">
        <VueScroll>
          <div class="blog-chatroom-msgWrap">
            <component :is="item.type"
                       v-for="(item,idx) in records"
                       :key="idx"
                       :data="item"></component>
          </div>
        </VueScroll>
      </div>
    </el-card>
    <el-card class="blog-chatroom-write"
             v-if="isLogin">
      <el-input v-model="msg"
                @keyup.enter.native="sendMsg"></el-input>
      <el-button type="info"
                 @click="sendMsg">发送</el-button>
    </el-card>
    <el-dialog title="昵称"
               :visible.sync="dialogVisible"
               width="30%">
      <span>请输入昵称</span>
      <span slog="body">
        <el-form>
          <el-form-item :rules="[
            { required: true, message: '昵称不能为空'},
          ]">
            <el-input v-model="nickname"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="login">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { io } from 'socket.io-client'
import ChatMsg from '@/components/chat/ChatMsg'
import ChatMymsg from '@/components/chat/ChatMymsg'
import ChatInfo from '@/components/chat/ChatInfo'
import socketListen from '@/utils/socketListen'

export default {
  name: 'chatroomView',
  components: { msg: ChatMsg, mymsg: ChatMymsg, info: ChatInfo },
  created() {
    if (!this.$socket) {
      this.socket = io(process.env.VUE_APP_SOCKET_URL, {
        transports: ['websocket'],
      })
      this.off = socketListen.call(this, this.socket)
    } else {
      this.socket = this.$socket
      this.off = socketListen.call(this, this.socket)
    }
  },
  beforeDestroy() {
    this.socket.emit('leave')
    this.off()
    this.socket = null
  },
  data() {
    return {
      socket: null,
      off: null,
      dialogVisible: false,
      nickname: '',
      msg: '',
      isLogin: false,
      records: [],
    }
  },
  computed: {},
  methods: {
    login() {
      let userData = this.$store.getters.userData

      let name = this.dialogVisible ? this.nickname : userData?.nickname

      if (!name) {
        this.dialogVisible = true
        return
      }
      this.socket.emit('enter chatroom', { uid: userData?.uid, name })
    },
    sendMsg(e) {
      if (!this.msg.trim()) {
        this.$notify.error({
          title: '错误',
          message: '不能发送空白消息',
        })
        return
      }
      this.records.push({
        name: this.nickname || this.$store.getters.userData?.nickname,
        msg: this.msg,
        date: new Date().toString(),
        type: 'mymsg',
      })
      this.socket.emit('msg to server', this.msg)
      this.msg = ''
    },
  },
}
</script>

<style lang="stylus">
.blog-chatroom
  position: absolute
  display: flex
  flex-direction: column
  width: 100%
  height: 100%

.blog-chatroom-main
  position: relative
  flex: 1
  overflow: auto
  margin-bottom: 10px

.blog-chatroom-msgBox
  position: absolute
  top: 0
  left: 0
  z-index: 0
  box-sizing: border-box
  width: 100%
  height: 100%

.blog-chatroom-msgWrap
  padding: 10px

.blog-chatroom-msgBox .__bar-is-vertical
  right: 0px !important

.blog-chatroom-msgWrap div
  margin-bottom: 15px
</style>