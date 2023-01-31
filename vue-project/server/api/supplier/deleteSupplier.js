let db = require('../db/index.js')
//获取供应商列表
exports.delete = (req, res) => {
  let id = req.query.id
  let sql = `delete from supplier where supplierid=${id}`
  db.query(sql, (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    res.send({
      code: 1,
      msg: 'success'
    })
  })
}