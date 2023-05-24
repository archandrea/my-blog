export default {
  "login": {
    rest: false,
    url: "/admin/login",
    method: "POST",
    toEncrypt: "password",
    withToken: false
  },
  "register": {
    rest: false,
    url: "/admin/register",
    method: "POST",
    toEncrypt: "password",
    withToken: false
  },
  "user": {
    rest: false,
    url: "/",
    method: "GET",
    withToken: true
  },
  "publicKey": {
    rest: false,
    url: "/publicKey",
    method: "GET",
    withToken: false
  },
  "category": {
    rest: false,
    url: "/api/rest/category",
    method: "GET",
    withToken: false
  },
  'articleById': {
    rest: true,
    url: '/api/rest/article/:id',
    method: 'GET'
  },
  'articles': {
    rest: false,
    url: '/api/rest/article',
    method: 'GET'
  },
  "postArticle": {
    rest: false,
    url: '/api/rest/article',
    method: 'POST'
  },
  "cover": {
    rest: false,
    url: '/upload/article',
    method: 'POST',
  }
}