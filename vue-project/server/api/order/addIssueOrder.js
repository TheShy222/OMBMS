let db = require('../db/index.js')

exports.post = (req, res) => {
    let orderNumber=req.body.formData.orderNumber
    let number=req.body.formData.number
    let totalPrice=req.body.formData.totalPrice
    let name=req.body.formData.name
    let phoneNumber=req.body.formData.phoneNumber
    let address=req.body.formData.address
    let goodsId=req.body.formData.goodsId
    let price=req.body.formData.price
    let size=req.body.formData.size
    let state=req.body.formData.state
    let sql=`insert into issueOrder values ('${orderNumber}',${number},${totalPrice},'${name}',${phoneNumber},'${address}','${goodsId}',${price},'${size}','${state}','暂无')`
    db.query(sql, (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send({
            code:1,
            list:data,
            msg:'添加数据成功'
        })
    })
}