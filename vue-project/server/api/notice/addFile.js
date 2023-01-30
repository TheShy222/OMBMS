let db = require('../db/index.js')
exports.post = (req, res) => {
    let file=JSON.parse(JSON.stringify(req.body)).file
    let sql = `insert into noticefile values ('${file}')`
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