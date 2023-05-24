<template>
  <div class="blog-userCard">
     <el-image 
              :src="user.avatar"
              fit="contain"></el-image>
    <p class="blog-user-nickname">{{user.nickname}}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {},
  data() {
    return {}
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {},
}
</script>

<style lang="stylus">
.blog-userCard
  overflow hidden
  height 100%
</style>