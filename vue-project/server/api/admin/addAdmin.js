let db = require('../db/index.js')
exports.post = (req, res) => {
  let id = req.body.id
  let name = req.body.name
  let pass = req.body.password
  let headimg = '/uploads/' + req.file.filename
  let sql = `insert into loginInfo values (${id},'${name}','${pass}','${headimg}','系统管理员')`
  db.query(sql, (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    res.send({
      code: 1,
      msg: "添加数据成功"
    })
  }
  )
}