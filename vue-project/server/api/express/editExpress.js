let db = require('../db/index.js')

exports.put = (req, res) => {
    let data = req.body
    let logo = 'http://localhost:8888/uploads/' + req.file.filename
    let sql = `update expresstype set type='${data.type}',logo='${logo}' where id=${data.id}`
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