let db = require('../db/index.js')

exports.post = (req, res) => {
    let id = Number(Date.now().toString().slice(-6))
    let type=req.body.type
    let sample='http://localhost:8888/uploads/' + req.file.filename
    let sql = `insert into goodstype values (${id},'${type}','${sample}')`
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