let db = require('../db/index.js')

exports.get = (req, res) => {
    let orderNumber = req.query.searchId
    let sql = ''
    if (orderNumber) {
        sql = `select * from aftersaleorder where orderNumber='${orderNumber}'`
    } else {
        sql = `select * from aftersaleorder`
    }
    db.query(sql, (err, result) => {
        if (err) {
            return res.send('错误：' + err.message)
        }
        let pageSize = Number(req.query.pageSize)
        let pageNo = Number(req.query.pageNo)
        let data = result.slice((pageNo - 1) * pageSize, (pageNo - 1) * pageSize + pageSize)
        res.send({
            code: 1,
            total: result.length,
            list: data,
        })
    }
    )
}