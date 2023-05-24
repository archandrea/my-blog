<template>
  <div class="blog-dateCard">
    <p>{{date | formatDate}}</p>
  </div>
</template>

<script>
import { Solar, Lunar, HolidayUtil } from 'lunar-javascript'

export default {
  components: {},
  data() {
    return {
      date: new Date(),
    }
  },
  computed: {},
  methods: {},
  filters: {
    formatDate(date) {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const weekDays = ['日', '一', '二', '三', '四', '五', '六']
      const weekDay = weekDays[date.getDay()]
      const lunarDate = Lunar.fromDate(date).toFullString()
      const lunarMonth = lunarDate.lMonth
      const lunarDay = lunarDate.lDay
      return `今天是${year}年${month}月${day}日，星期${weekDay}，农历${lunarDate}`
    },
  },
}
</script>

<style lang="stylus">
.blog-dateCard
  padding: 8px
  height: 100%

.blog-dateCard p
  display -webkit-box
  overflow: hidden
  text-align: justify
  text-overflow: ellipsis
  -webkit-box-orient: vertical
  -webkit-line-clamp: 10
  text-align: left
  text-indent: 2em
  line-height: 24px
</style>