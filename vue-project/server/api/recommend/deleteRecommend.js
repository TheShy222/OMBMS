let db = require('../db/index.js')

exports.delete = (req, res) => {
    let id = req.query.id
    let sql = `delete from recommend where id=${id}`
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