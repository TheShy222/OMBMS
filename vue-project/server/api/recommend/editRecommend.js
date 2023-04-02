let db = require('../db/index.js')

exports.put = (req, res) => {
    let data = req.body
    let url = 'http://localhost:8888/uploads/' + req.file.filename
    let sql = `update recommend set url='${url}',name='${data.name}',price=${data.price} where id=${data.id}`
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