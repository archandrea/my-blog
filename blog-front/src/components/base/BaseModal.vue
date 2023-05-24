<template>
  <div>
    <el-dialog :title="title"
               :visible.sync="isVisible"
               width="40%"
               :before-close="close">
      <BaseForm :formType="type"
                ref="form" />
      <span slot="footer"
            class="dialog-footer">
        <el-button v-for="(btn,idx) in btns"
                   :key="idx"
                   @click="btnActionHandler(btn.action)"
                   type="primary"
                   size="medium"
                   :native-type="btn.action==='submit'?'submit':'button'">{{btn.text}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import BaseForm from './BaseForm'
import MODAL_MAP from '@/maps/modal.map'
const { mapState, mapActions } = createNamespacedHelpers('modal')

export default {
  components: {
    BaseForm,
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['isVisible', 'modalType']),
    title() {
      return MODAL_MAP[this.modalType]?.['title'] ?? '您好'
    },
    type() {
      return MODAL_MAP[this.modalType]?.['type'] ?? 'login'
    },
    btns() {
      return (
        MODAL_MAP[this.modalType]?.['btns'] ?? [
          {
            action: 'submit',
            type: 'submit',
            text: '提交',
          },
          {
            action: 'reset',
            type: 'button',
            text: '重置',
          },
        ]
      )
    },
  },
  methods: {
    ...mapActions(['open', 'close', 'submit']),
    btnActionHandler(action) {
      this[action] && this[action]()
    },
    async submit() {
      let refForm = this.$refs['form']
      refForm.$refs['el-form'].validate(async (valid) => {
        if (!valid) {
          console.log('error submit!')
          return false
        }
        try {
          let res = await this.$http({
            path: this.type,
            data: refForm.formData,
          })
          console.log(res)
          this.$notify({
            title: '成功',
            message: res.msg,
            type: 'success',
          })
          this.close()
        } catch (err) {
          console.log(err)
          let errData = err.response?.data
          if (errData?.errors) {
            for (const key in errData.errors) {
              this.$notify.error({
                title: '错误',
                message: errData.errors[key],
              })
            }
          } else {
            this.$notify.error({
              title: '错误',
              message: errData?.msg,
            })
          }
        }
      })
    },
    reset() {
      this.$refs['form'].$refs['el-form'].resetFields()
    },
  },
  watch: {
    isVisible(value) {
      if(!value) {
        this.reset()
      }
    }
  }
}
</script>
<style>
</style>