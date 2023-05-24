<template>
  <el-header class="blog-header"
             height="10vh">
    <el-row class="blog-header-wrap"
            type="flex">
      <el-col :span="4">
        <el-image class="blog-logo"
                  :src="require('@/assets/logo.png')"
                  fit="contain"></el-image>
      </el-col>
      <el-col :span="14">
        <el-menu class="blog-header-nav"
                 ref="navigation"
                 mode="horizontal"
                 background-color="#B3C0D1"
                 text-color="#ffffff"
                 active-text-color="#123456"
                 :unique-opened="true"
                 :default-active="defaultActive"
                 router>
          <el-menu-item index="/index">HOME</el-menu-item>
          <el-submenu index="">
            <template slot="title">分类</template>
            <el-menu-item index="1">技术文章</el-menu-item>
            <el-menu-item index="2">心得体会</el-menu-item>
            <el-menu-item index="3">职场感悟</el-menu-item>
          </el-submenu>
          <el-menu-item index="/article/:id">文章</el-menu-item>
          <el-menu-item index="/private">私密</el-menu-item>
          <el-menu-item index="/about">相关</el-menu-item>
          <el-menu-item index="/chatroom">聊天室</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="6">
        <component :is="$store.state.token?'UserMiniVerified':'UserMiniLogin'"></component>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
import MIXIN from '@/utils/mixin'
import UserMiniLogin from '@/components/user/UserMiniLogin'
import UserMiniVerified from '@/components/user/UserMiniVerified'

export default {
  mixins: [MIXIN],
  components: {
    UserMiniLogin,
    UserMiniVerified,
  },
  created() {
    let path = this.$route.path
    path = this.restorePath(path, this.$route.params)
    this.defaultActive = path
  },
  data() {
    return {
      defaultActive: '',
    }
  },
  computed: {},
  methods: {},
  watch: {
    $route(to) {
      let path = to.path
      path = this.restorePath(path, to.params)
      this.$refs['navigation'].activeIndex = path
    },
  },
}
</script>

<style lang="stylus">
.blog-header-nav
  display: flex
  justify-content: center

.blog-header-wrap
  margin: 0 auto
  max-width: 1000px

.blog-header-wrap > div
  height: 10vh
  line-height: 10vh

.blog-header-nav > .el-menu-item
  height: 10vh
  line-height: 10vh

.blog-header-nav > .el-submenu .el-submenu__title
  height: 10vh
  line-height: 10vh

.el-header, .el-footer
  background-color: #B3C0D1
  color: #333
  text-align: center
  line-height: 60px
</style>