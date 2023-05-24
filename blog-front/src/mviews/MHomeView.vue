<template>
  <div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item icon="search">搜素</van-tabbar-item>
      <van-tabbar-item icon="friends-o">用户</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      active: 0,
    }
  },
  computed: {},
  methods: {},
}
</script>

<style>
</style>