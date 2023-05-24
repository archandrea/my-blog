<template>
  <el-aside class="blog-aside"
            width="100%">
    <el-card>
      <component :is="$store.state.token?'UserCard':'DateCard'"></component>
    </el-card>
  </el-aside>

</template>

<script>
import UserCard from '@/components/user/UserCard'
import DateCard from '@/components/base/DateCard'

export default {
  components: {
    UserCard,
    DateCard,
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>

<style lang="stylus">
.blog-aside
  overflow: hidden
  padding-right: 10px
  max-width: 300px
</style>