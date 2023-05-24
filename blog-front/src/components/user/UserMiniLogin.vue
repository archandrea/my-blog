<template>
  <div class="blog-header-user">
    <span @click="openModal('login')">登录</span><span> / </span><span @click="openModal('register')">注册</span>
  </div>
</template>

<script>
import MIXIN from '@/utils/mixin'

export default {
  components: {},
  mixins: [MIXIN],
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>

<style lang="stylus">
.blog-header-user
  color: #fff
  cursor: pointer
</style>