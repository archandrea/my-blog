<template>
  <el-card class="blog-article">
    <div class="blog-article-info">
      <h3>{{article?.title}}</h3>
      <div><span class="blog-article-author">{{article?.author?.nickname}}</span><span class="blog-article-date">{{article?.date | formatDate}}</span></div>
      <p class="blog-article-content"
         v-html="article?.content"></p>
      <span v-if="article?._id"
            class="blog-article-bar">点击({{article?.click_count}}) 点赞({{article?.like_count}}) 评论({{article?.comment_count}})</span>
    </div>
  </el-card>
</template>

<script>
import MIXIN from '@/utils/mixin'

export default {
  components: {},
  mixins: [MIXIN],
  created() {
    this.getArticleById()
  },
  data() {
    return {
      article: {},
    }
  },
  computed: {},
  methods: {
    async getArticleById() {
      if (this.$route.params.id === ':id') {
        return
      }
      try {
        let res = await this.$http({
          path: 'articleById',
          data: {
            id: this.$route.params.id,
          },
        })
        this.article = res.payload.data
      } catch (err) {
        this.$notify.error({
          title: '获取文章错误',
          message: err,
        })
      }
    },
  },
}
</script>

<style>
</style>