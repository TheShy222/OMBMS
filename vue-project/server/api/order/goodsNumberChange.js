let db = require('../db/index.js')

exports.post = (req, res) => {
    let number=req.body.formData.number
    let id=req.body.formData.id
    let sql=`update goodsInfo set reserve=reserve-${number} where id=${id}`
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