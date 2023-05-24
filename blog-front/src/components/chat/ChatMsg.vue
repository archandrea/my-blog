<template>
  <div class="blog-chat-msg">
    <span>{{data.name}}</span>
    <p>{{data.msg}}</p>
    <span class="blog-chat-date">{{data.date | formatDate}}</span>
  </div>
</template>

<script>
import MIXIN from '@/utils/mixin'


export default {
  name: 'chatMsg',
  mixins: [MIXIN],
  props: {
    data: {
      type: Object,
    },
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
.blog-chat-msg
  display: flex
  flex-direction: column
  align-items: flex-start

.blog-chat-msg p
  padding: 10px 5px
  border: 1px solid #333
  border-radius: 8px

.blog-chat-date
  color: #999
  font-size: 12px
</style>