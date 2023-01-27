let db = require('../db/index.js')

exports.post = (req, res) => {
    let number=req.body.formData.number
    let goodsId=req.body.formData.goodsId
    let size=req.body.formData.size
    let sql=`update goodsInfo set reserve=reserve-${number} where goodsId='${goodsId}' and size='${size}'`
    db.query(sql, (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send({
            code:1,
            msg:'商品数量更新成功'
        })
    })
}