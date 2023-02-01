let db = require('../db/index.js')
exports.post = (req, res) => {
  let id = req.body.id
  let name = req.body.name
  let pass = req.body.password
  let adminimg = '/uploads/' + req.file.filename
  let sql = `insert into receptionadmin values (${id},'${name}','${pass}','${adminimg}','前台网页管理员')`
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