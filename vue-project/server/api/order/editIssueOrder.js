let db = require('../db/index.js')

exports.post = (req, res) => {
    let orderNumber=req.body.formData.orderNumber
    let name=req.body.formData.name
    let phoneNumber=req.body.formData.phoneNumber
    let address=req.body.formData.address
    let size=req.body.formData.size
    let sql=`update issueOrder set name='${name}',phoneNumber=${phoneNumber},address='${address}',size='${size}' where orderNumber='${orderNumber}'`
    db.query(sql, (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send({
            code:1,
            msg:'编辑数据成功'
        })
    })
}