let db = require('../db/index.js')
//获取供应商列表
exports.post = (req, res) => {
    let id = Number(Date.now().toString().slice(-6))
    let name = req.body.supplier.name
    let phoneNumber = req.body.supplier.phoneNumber
    let address = req.body.supplier.address
    let mainbusiness = req.body.supplier.mainbusiness
    let ltt = req.body.supplier.ltt
    ltt = ltt.slice(0, 10)
    let sql = `insert into supplier values (${id},'${name}','${phoneNumber}','${address}','${mainbusiness}','${ltt}')`
    db.query(sql, (err, data) => {
        if (err) {
            return res.send('错误：' + err.message)
        }
        res.send({
            code: 1,
            msg: 'success',
        })
    })
}
