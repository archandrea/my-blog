// 状态码对照表
const status = {
  "9000": {
    "label": "user_actionsuccess",
    "msg": "操作成功"
  },
  "9001": {
    "label": "user_empty",
    "msg": "用户名或密码为空"
  },
  "9002": {
    "label": "user_exist",
    "msg": "用户已存在"
  },
  "9003": {
    "label": "user_nonexist",
    "msg": "用户不存在"
  },
  "9004": {
    "label": "user_notfound",
    "msg": "用户查询失败"
  },
  "9005": {
    "label": "user_expire",
    "msg": "签证过期"
  },
  "9006": {
    "label": "user_nontoken",
    "msg": "签证不存在"
  },
  "9007": {
    "label": "user_passwordwrong",
    "msg": "用户密码错误"
  },
}

module.exports = {
  // 输入状态码获取状态信息方法
  getStatus(code) {
    return {
      status: code,
      ...status[String(code)]
    }
  }
}