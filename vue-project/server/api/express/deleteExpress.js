let db = require('../db/index.js')

exports.delete = (req, res) => {
    let id = req.query.id
    let sql = `delete from expresstype where id=${id}`
    console.log(sql);
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