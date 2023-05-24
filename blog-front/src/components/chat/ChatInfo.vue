<template>
  <div class="blog-chat-info">
    <span>-----</span><span>{{data.msg}}</span><span>-----</span>
  </div>
</template>

<script>
export default {
  name: 'chatInfo',
  props: {
    data: {
      type: Object
    }
  },
  components: {},
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>

<style lang="stylus">
.blog-chat-info
  display: flex
  justify-content: center

.blog-chat-info span
  color: #999
  font-size: 14px
</style>