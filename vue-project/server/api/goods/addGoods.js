let db = require('../db/index.js')

exports.post = (req, res) => {
    let data = req.body
    let id = Number(Date.now().toString().slice(-6))
    let picture = 'http://localhost:8888/uploads/' + req.file.filename
    let sql = `insert into goodsinfo values (${id},'${data.goodsId}','${data.size}','${data.brand}','${picture}',${data.price},'${data.detail}',${data.reserve},${data.goodsShelves},'${data.type}')`
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