<template>
  <div class="blog-header-user">
    <el-image class="blog-user-avatar"
              :src="user.avatar"
              fit="contain"></el-image>
    <p class="blog-user-nickname">{{user.nickname}}</p>
    <span class="blog-user-logout el-icon-s-promotion"
          @click="logout">登出</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {},
  created() {
    let isLogin = this.$store.state.token
    if (isLogin) {
      this.$store.dispatch('getUserData')
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    },
  },
}
</script>

<style lang="stylus">
@import '@/assets/css/_variables.styl'

.blog-header-user
  display: flex
  justify-content: center
  align-items: center
  height: 10vh
  line-height: 10vh

+prefix-classes('blog-user-')
  .avatar
    position: relative
    display: flex
    justify-content: center
    align-items: center
    overflow: hidden
    width: 40px
    min-width: 40px
    height: 40px
    border-radius: 50%
    background-color: #fff

    &:hover i
      transform: translate(0)

    img
      width: 100%
      height: 100%

    i
      position: absolute
      color: #fff
      font-size: 16px
      transition: 0.3s
      transform: translate(-200%, 0)

  .nickname
    overflow: hidden
    margin: 0
    padding-right: 2 * pad-width
    padding-left: pad-width
    text-overflow: ellipsis
    white-space: nowrap
    font-size: 14px
    // line-height: 14px

  .logout:hover
    color: #123456
</style>