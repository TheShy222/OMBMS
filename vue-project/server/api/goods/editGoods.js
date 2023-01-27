let db = require('../db/index.js')

exports.post = (req, res) => {
  let data = req.body.formData
  let id=req.body.formData.goodsId
  let sql = `update goodsInfo set goodsShelves=${data.goodsShelves},type='${data.type}',brand='${data.brand}',price=${data.price},detail='${data.detail}',reserve=${data.reserve} where goodsid='${id}' and size='${data.size}'`
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
