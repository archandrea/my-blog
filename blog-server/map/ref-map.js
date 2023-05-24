const User = require('../dbmodels/User')
const Article = require('../dbmodels/Article')
const Comment = require('../dbmodels/Comment')
const Category = require('../dbmodels/Category')

module.exports = {
  create_map: {
    "Comment": {
      "ref": "aid",
      "ref_model": Article,
      "query": "findByIdAndUpdate",
      "option": function (_id) {
        return {
          "$push": {
            "comments": _id
          },
          "$inc": {
            "comment_count": 1
          }
        }
      }
    },
    "Article": {
      "ref": "category",
      "ref_model": Category,
      "query": "findByIdAndUpdate",
      "option": function (_id) {
        return {
          "$push": {
            "articles": _id
          }
        }
      }
    }
  },
  read_map: {
    "Article": [{
      "path": "author",
      "select": "nickname avatar"
    },
    {
      "path": "category",
      "select": "name"
    },
    {
      "path": "comments",
      "select": "content date uid",
      "populate": {
        "path": "uid",
        "select": "nickname avatar"
      }
    }],
    "Comment": [{
      "path": "uid",
      "select": "nickname avatar"
    }],
    "Category": [
      {
        "path": "articles",
        "select": "title cover date click_count comment_count like_count author"
      }
    ]
  },
  update_map: {
    "Article": {
      "revisable": ["title", "cover", "content"],
      "auth_field": "author"
    },
    "User": {
      "revisable": ["password", "email", "nikname"],
      "auth_field": "_id"
    },
    "Comment": {
      "revisable": ["content"],
      "auth_field": "uid"
    },
    "Category": {
      "revisable": ["name"],
      "auth_field": "uid"
    }
  },
  delete_map: {

  }
}