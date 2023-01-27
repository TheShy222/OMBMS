let db = require('../db/index.js')
exports.get = (req, res) => {
  let ids = req.query.ids
  let sql = `delete from goodsinfo where goodsShelves in (${ids})`
  db.query(sql, (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    res.send({
      code: 1,
      msg: "批量删除数据成功"
    })
  })
}
