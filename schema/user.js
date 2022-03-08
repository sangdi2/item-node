const joi = require('@hapi/joi')

const id =joi.number().integer().min(1).required()

const nickname =joi.string().required()

// 验证规则对象 - 更新用户基本信息
exports.update_userinfo_schema = {
    body: {
      id,
      nickname,
      email,
    },
  }
  