<template>
  <div class="blog-chat-mymsg">
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
.blog-chat-mymsg
  display: flex
  flex-direction: column
  align-items: flex-end

.blog-chat-mymsg p
  padding: 10px 5px
  border-radius: 8px
  background-color: #333
  color: #fff

.blog-chat-date
  color: #999
  font-size: 12px
</style>