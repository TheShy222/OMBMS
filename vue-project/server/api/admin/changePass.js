let db = require('../db/index.js')
//获取管理员列表
exports.post = (req, res) => {
    let newpass = req.body.password
    let id = req.body.id
    let headimg = 'http://localhost:8888/uploads/' + req.file.filename
    let sql = `update admin set password='${newpass}',headimg='${headimg}' where id=${id}`
    db.query(sql, (err, data) => {
        if (err) {
            return res.send('错误：' + err.message)
        }
        res.send({
            code: 1,
            msg: '修改成功',
        })
    })
}
