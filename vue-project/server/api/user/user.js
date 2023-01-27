let db = require('../db/index.js')

exports.get = (req, res) => {
    let id = req.query.searchId
    let asc = req.query.asc
    let desc = req.query.desc
    if (id) {
        sql = `select * from userinfo where id=${id}`
    }
    else if (asc) {
        sql = `select * from userinfo order by integral asc`
    }
    else if (desc) {
        sql = `select * from userinfo order by integral desc`
    }
    else {
        sql = `select * from userinfo`
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
    })
}