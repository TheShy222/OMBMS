let db = require('../db/index.js')

exports.post = (req, res) => {
    let data = req.body.formData
    let sql = `insert into goodsinfo values ('${data.goodsId}','${data.size}','${data.brand}','${data.picture}',${data.price},'${data.detail}',${data.reserve},${data.goodsShelves},'${data.type}')`
    db.query(sql, (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send({
            code:1,
            list:data,
            msg:'success'
        })
    })
}