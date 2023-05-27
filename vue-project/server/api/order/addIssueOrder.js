let db = require('../db/index.js')

exports.post = (req, res) => {
    let orderNumber = Date.now().toString()
    let number=req.body.formData.number
    let totalPrice=req.body.formData.totalPrice
    let name=req.body.formData.name
    let phoneNumber=req.body.formData.phoneNumber
    let address=req.body.formData.address
    let id=req.body.formData.id
    let price=req.body.formData.price
    let size=req.body.formData.size
    let detail=req.body.formData.detail
    let url=req.body.formData.url
    let state=req.body.formData.state || '未发货'
    let sql=`insert into issueOrder values ('${orderNumber}',${id},${number},${totalPrice},'${name}',${phoneNumber},'${address}',${price},'${size}','${detail}','${url}','${state}','暂无')`
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