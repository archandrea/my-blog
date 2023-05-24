<template>
  <div class="blog-page">
    <el-container class="blog-container"
                  direction="verticle">
      <BaseHeader />
      <el-container class="blog-body">
        <el-row class="blog-middle-wrap"
                type="flex"
                justify="flex-wrap"
                align="center">
          <el-col class="hidden-sm-and-down"
                  :span="6">
            <BaseAside />
          </el-col>
          <el-col :span="24"
                  :md="{span:18}">
            <el-main class="blog-main">
              <VueScroll ref="scrollbar"
                         :ops="ops"
                         @handle-scroll="loadMore">
                <transition enter-active-class="animate__animated animate__fadeIn"
                            appear
                            mode="out-in">
                  <keep-alive :include="['articleListView']">
                    <router-view v-if="viewDisplay"
                                 :lockLoading="lockLoading"
                                 :loading="loading"
                                 :scrollBack="scrollBack"
                                 :scrollTop="scrollTop?.[$route.name]" />

                  </keep-alive>
                </transition>
              </VueScroll>
            </el-main>
          </el-col>
        </el-row>

      </el-container>

      <el-footer class="blog-footer"
                 height="10vh">Footer
      </el-footer>
    </el-container>
    <BaseModal />
  </div>
</template>

<script>
import BaseHeader from '@/components/macro/BaseHeader'
import BaseAside from '@/components/macro/BaseAside'
import BaseModal from '@/components/base/BaseModal'
import { mapActions } from 'vuex'
import _ from 'lodash'

export default {
  components: {
    BaseHeader,
    BaseAside,
    BaseModal,
  },
  data() {
    return {
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {},
        bar: {},
      },
      scrollTop: {
        articleList: 0,
      },
      loading: false,
      viewDisplay: true,
    }
  },
  computed: {},
  methods: {
    reload() {
      this.viewDisplay = false
      this.$nextTick(() => {
        this.viewDisplay = true
      })
    },
    lockLoading() {
      this.loading = false
    },
    loadMore: _.throttle(
      function (v, h, e) {
        this.scrollTop[this.$route.name] = v.scrollTop
        if (this.loading) {
          return
        }
        let st = v.scrollTop
        let sh = e.srcElement.scrollHeight - e.srcElement.clientHeight
        if (sh > 200 && sh - st < 200) {
          this.loading = true
        }
      },
      500,
      false
    ),
    scrollBack(scrollTop) {
      this.$refs['scrollbar'].scrollTo({ y: scrollTop })
    },
  },
}
</script>
<style lang="stylus">
.blog-container
  overflow: hidden
  height: 100%

.blog-middle-wrap
  margin: 0 auto
  max-width: 1000px
  width: 100%

.blog-main
  overflow: hidden
  padding: 0
  width: 100%
  height: 100%

.blog-body
  overflow: hidden
  padding: 8px 60px
  height: 80vh
  background-color: #E9EEF3

.blog-logo
  width: 40px
  height: 40px
  vertical-align: middle
  cursor: pointer

.__view
  width: 100% !important
</style>