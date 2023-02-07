let db = require('../db/index.js')

exports.get = (req, res) => {
  let orderNumber=req.query.orderNumber
    let sql=`delete from issueOrder where orderNumber=${orderNumber}`
    db.query(sql, (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send({
            code:1,
            msg:'success'
        })
    })
}