let db = require('../db/index.js')

exports.post = (req, res) => {
    let id = Number(Date.now().toString().slice(-6))
    let name = req.body.user.name
    let phoneNumber = req.body.user.phoneNumber
    let password = req.body.user.password
    let address = req.body.user.address
    let integral = req.body.user.integral
    let sql = `insert into userinfo values(${id},'${name}',${phoneNumber},'${password}','${address}',${integral},'https://img0.baidu.com/it/u=2270256597,1763841447&fm=253&fmt=auto&app=138&f.JPEG')`
    db.query(sql, (err, result) => {
        if (err) {
            return res.send('错误：' + err.message)
        }
        res.send({
            code: 1,
            msg: '添加成功'
        })
    })
}