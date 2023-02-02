let db = require('../db/index.js')

exports.post = (req, res) => {
  let id = req.body.id
  let type=req.body.type
  let sample = 'http://localhost:8888/uploads/' + req.file.filename
  let sql = `update goodsType set type='${type}',sample='${sample}' where id=${id}`
  db.query(sql, (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    res.send({
      code: 1,
      msg: "修改数据成功"
    })
  })
}
