<template>
  <el-form ref="el-form"
           :model="formData"
           label-width="80px">
    <el-form-item v-for="(item) in formList"
                  :key="item.label"
                  :label="item.text"
                  :prop="item.label"
                  :rules="validator[item.label]">
      <el-input v-model="formData[item.label]"
                :type="item.type"
                :placeholder="item.placeholder"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import FORM_MAP from '@/maps/form.map'
import VALIDATOR_MAP from '@/maps/validator.map'

export default {
  components: {},
  props: {
    formType: {
      type: String,
    },
  },
  data() {
    return {
      formData: {},
      formList: FORM_MAP[this.formType],
      validator: VALIDATOR_MAP[this.formType],
    }
  },
  computed: {},
  methods: {
    reset() {
      this.$refs['el-form'].resetFields()
    },
  },
  watch: {
    formType(newV,oldV) {
      this.formData = {}
      this.reset()
    },
  },
}
</script>

<style>
</style>