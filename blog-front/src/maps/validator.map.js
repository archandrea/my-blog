// 验证器mapchange
export default {
  "login": {
    "username": [
      { required: true, message: '用户名不能为空', trigger: 'change' },
      { pattern: /^(?![\W_])/, message: '不能以符号开头', trigger: 'change' },
      { min: 4, max: 8, message: '长度应为4-8位', trigger: 'change' }
    ],
    "password": [
      { required: true, message: '密码不能为空', trigger: 'change' },
      { pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/, message: '需包含大写字母、小写字母和数字', trigger: 'change' },
      { min: 8, max: 12, message: '长度应为8-12位', trigger: 'change' }
    ]
  },
  "register": {
    "username": [
      { required: true, message: '用户名不能为空', trigger: 'change' },
      { pattern: /^(?![\W_])/, message: '不能以符号开头', trigger: 'change' },
      { min: 4, max: 8, message: '长度应为4-8位', trigger: 'change' }
    ],
    "password": [
      { required: true, message: '密码不能为空', trigger: 'change' },
      { pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/, message: '需包含大写字母、小写字母和数字', trigger: 'change' },
      { min: 8, max: 12, message: '长度应为8-12位', trigger: 'change' }
    ]
  },
  "editor": {
    "title": {
      pipe: 'isRequire',
      msg: '标题不能为空',
    },
    "content": {
      pipe: 'isRequire',
      msg: '内容不能为空',
    },
  }
}