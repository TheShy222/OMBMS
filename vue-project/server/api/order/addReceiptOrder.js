let db = require('../db/index.js')

exports.post = (req, res) => {
    let orderNumber = Number(Date.now().toString().slice(-8))
    let name=req.body.formData.name
    let phoneNumber=req.body.formData.phoneNumber
    let goodsId=req.body.formData.goodsId
    let size=req.body.formData.size
    let number=req.body.formData.number
    let price=req.body.formData.price
    let sql=`insert into receiptOrder values (${orderNumber},'${name}',${phoneNumber},'${goodsId}','${size}',${number},${price})`
    db.query(sql, (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send({
            code:1,
            msg:'添加数据成功'
        })
    })
}