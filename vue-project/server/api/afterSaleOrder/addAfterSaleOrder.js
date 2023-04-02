let db = require('../db/index.js')

exports.post = (req, res) => {
    let data = req.body.formData
    let orderNumber = Date.now()
    let sql = `insert into aftersaleorder values ('${orderNumber}','${data.cause}','${data.detail}',${data.phoneNumber},'${data.express}',${data.price})`
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