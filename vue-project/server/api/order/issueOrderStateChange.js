let db = require('../db/index.js')

exports.post = (req, res) => {
  let orderNumber=req.body.orderNumber
  let expressType=req.body.expressType
    let sql=`update issueOrder set state='已发货',express='${expressType}' where orderNumber='${orderNumber}'`
    db.query(sql, (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send({
            code:1,
            msg:'发货成功'
        })
    })
}