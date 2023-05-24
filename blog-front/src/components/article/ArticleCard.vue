<template>
  <el-card class="blog-articleCard">
    <el-row class="blog-articleCard-wrap"
            :gutter="10">
      <el-col class="blog-articleCard-coverWrap"
              :span="8">
        <el-image class="blog-articleCard-cover"
                  :src="article.cover"
                  fit="cover"></el-image>
      </el-col>
      <el-col :span="16">
        <div class="blog-articleCard-info">
          <h3>{{article.title}}</h3>
          <div><span class="blog-articleCard-author">{{article.author?.nickname}}</span><span class="blog-articleCard-date">{{article.date | formatDate}}</span></div>
          <p class="blog-articleCard-content"
             v-html="article.content"></p>
          <span class="blog-articleCard-bar">点击({{article.click_count}}) 点赞({{article.like_count}}) 评论({{article.comment_count}})</span>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import MIXIN from '@/utils/mixin'

export default {
  components: {},
  mixins: [MIXIN],
  props: {
    article: {
      type: Object,
    },
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    // goToArticle() {
    //   console.log(this.article)
    //   this.$router.push({ name: 'article', params: { id: this.article._id } })
    // },
  },
}
</script>

<style lang="stylus">
.blog-articleCard
  & + .blog-articleCard
    margin-top: 10px

  .el-card__body
    padding: 8px
    padding-right: 15px

.blog-articleCard-coverWrap
  max-width: 220px

.blog-articleCard-cover
  width: 100%
  height: 20vh
  background-color: #333
  cursor: pointer

.blog-articleCard-info
  display: flex
  flex-direction: column
  justify-content: space-between
  height: 20vh

  h3
    margin: 5px 0
    cursor: pointer

  .blog-articleCard-content
    display: -webkit-box
    overflow: hidden
    margin: 5px 0
    text-align: justify
    text-overflow: ellipsis
    -webkit-box-orient: vertical
    -webkit-line-clamp: 3

  .blog-articleCard-bar
    font-size: 14px

  .blog-articleCard-author
    padding-right: 20px
</style>