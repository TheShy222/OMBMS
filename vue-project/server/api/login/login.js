let db = require('../db/index.js')

exports.post = (req, res) => {
  let name = req.body.name
  let pass = req.body.password
  let sql = `select * from loginInfo where name="${name}" and password="${pass}"`
  db.query(sql, (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    if(data.length>0){
      res.send({
        code: 1,
        msg: "登录成功",
        resultInfo:data
      })
    }else{
      res.send({
        code: -1,
        msg: "账号或密码错误"
      })
    }
  })
}
