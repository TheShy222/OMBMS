let db = require('../db/index.js')
//获取管理员列表
exports.delete=(req,res)=>{
    let orderNumber=req.query.orderNumber
    let sql=`delete from aftersaleorder where orderNumber='${orderNumber}'`
    db.query(sql,(err,data)=>{
      if (err) {
        return res.send('错误：' + err.message)
      }
      res.send({
        code: 1,
        msg:'删除成功'
      })
    })
}