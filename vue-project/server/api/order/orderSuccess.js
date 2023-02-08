let db = require('../db/index.js')

exports.get = (req, res) => {
    let orderNumber=req.query.orderNumber
    let sql=`select * from issueOrder where phoneNumber=${orderNumber} and state='未发货'`
    db.query(sql, (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send({
            code:1,
            list:data,
        })
    })
}