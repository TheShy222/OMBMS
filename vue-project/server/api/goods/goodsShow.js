let db = require('../db/index.js')

exports.get = (req, res) => {
    let type=req.query.type
    let sql = `select * from goodsinfo where type='${type}'`
    db.query(sql, (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send({
            code:1,
            list:data
        })
    })
}