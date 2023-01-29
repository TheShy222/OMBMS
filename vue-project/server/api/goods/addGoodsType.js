let db = require('../db/index.js')

exports.post = (req, res) => {
    let id=req.body.id
    let type=req.body.type
    let sample='/uploads/' + req.file.filename
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