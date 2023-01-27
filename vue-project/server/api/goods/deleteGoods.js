let db = require('../db/index.js')

exports.get = (req, res) => {
    let id = req.query.id
    let size = req.query.size
    let sql = `delete from goodsInfo where goodsId='${id}' and size='${size}'`
    console.log(sql)
    db.query(sql, (err, data) => {
        if (err) {
            return res.send('错误：' + err.message)
        }
        res.send({
            code: 1,
            msg: 'success'
        })
    })
}