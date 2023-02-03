let db = require('../db/index.js')

exports.post = (req, res) => {
  let data = req.body
  let id=req.body.id
  let picture = 'http://localhost:8888/uploads/' + req.file.filename
  let sql = `update goodsInfo set goodsShelves=${data.goodsShelves},type='${data.type}',brand='${data.brand}',picture='${picture}',price=${data.price},detail='${data.detail}',reserve=${data.reserve} where id=${id}`
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
