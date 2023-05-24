const path = require("path")

// 服务器配置信息
module.exports = {
  // 主机地址
  host: '127.0.0.1',
  // 根目录
  root: process.cwd(),
  // 端口
  port: 8080,
  // URL
  URL: `http://127.0.0.1:8080`,
  ws_port: 8888,
  WS_URL: `ws://127.0.0.1:8888`,
  // 路径
  path: {
    // 密钥文件夹
    key: path.join(process.cwd(), '/auth'),
    // 公钥文件
    publicKey: path.join(process.cwd(), '/auth/public.cer'),
    // 私钥文件
    privateKey: path.join(process.cwd(), '/auth/private.cer'),
    // 上传地址
    upload: path.join(__dirname, '/upload'),
    // 静态地址
    public: path.join(__dirname, '/public'),
  },
  limit: {
    singleFileSize: 1048576
  }
}