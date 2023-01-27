let db = require('../db/index.js')

exports.post = (req, res) => {
   let name=req.body.user.name
   let phoneNumber=req.body.user.phoneNumber
   let address=req.body.user.address
   let integral=req.body.user.integral
   let id=req.body.user.id
   let sql=`update userinfo set name='${name}',phoneNumber=${phoneNumber},address='${address}',integral=${integral} where id=${id}`
    db.query(sql, (err, result) => {
        if (err) {
            return res.send('错误：' + err.message)
        }
        res.send({
            code: 1,
            msg: '修改成功'
        })
    })
}