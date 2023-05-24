<template>
  <div class="blog-articleList">
    <router-link v-for="item in articles"
                 :key=" item._id"
                 :to="{name:'article',params:{id:item._id}}">
      <ArticleCard :article="item" />
    </router-link>
    <p class="blog-articleList-endTip"
       v-if="end">This is the end~</p>
  </div>
</template>

<script>
import ArticleCard from '@/components/article/ArticleCard'

export default {
  name: 'articleListView',
  components: {
    ArticleCard,
  },
  created() {
    this.getArticles()
  },
  activated() {
    this.scrollBack(this.scrollTop)
  },
  props: {
    lockLoading: {
      type: Function,
    },
    loading: {
      type: Boolean,
    },
    scrollBack: {
      type: Function,
    },
    scrollTop: {
      type: Number
    }
  },
  data() {
    return {
      size: 6,
      page: 1,
      articles: [],
      end: false,
    }
  },
  computed: {},
  methods: {
    async getArticles() {
      try {
        let res = await this.$http({
          path: 'articles',
          data: {
            size: this.size,
            page: this.page,
          },
        })
        this.articles.push(...res.payload.data.records)
        if (this.articles.length >= res.payload.data.total) {
          this.end = true
          return
        }
        this.lockLoading()
        this.page++
      } catch (err) {
        this.$notify.error({
          title: '获取文章列表错误',
          message: err,
        })
      }
    },
  },
  watch: {
    loading(newV, oldV) {
      if (newV) {
        this.getArticles()
      }
    },
  },
}
</script>

<style lang="stylus">
.blog-articleList
  width: 100%

.blog-articleList-endTip
  text-align: center
</style>