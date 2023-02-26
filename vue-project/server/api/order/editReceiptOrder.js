let db = require('../db/index.js')

exports.put = (req, res) => {
    let orderNumber=req.body.formData.orderNumber
    let name=req.body.formData.name
    let phoneNumber=req.body.formData.phoneNumber
    let goodsId=req.body.formData.goodsId
    let size=req.body.formData.size
    let number=req.body.formData.number
    let price=req.body.formData.price
    let sql=`update receiptOrder set name='${name}',phoneNumber=${phoneNumber},goodsId='${goodsId}',size='${size}',number=${number},price=${price} where orderNumber=${orderNumber}`
    db.query(sql, (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send({
            code:1,
            msg:'更新数据成功'
        })
    })
}