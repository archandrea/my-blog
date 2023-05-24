import Vue from "vue";
import vuescroll from "vuescroll";

// 你可以在这里设置全局配置.
Vue.use(vuescroll, {
  ops: {
    // 设置默认的全局配置
  },
  name: "VueScroll" // 自定义组件名称， 默认是vueScroll
});

/**
 * 或者
 */
Vue.prototype.$vuescrollConfig = {
  bar: {
    background: "#aaa"
  }
};