let db = require('../db/index.js')
//获取管理员列表
exports.delete=(req,res)=>{
    let id=req.query.commentId
    let sql=`delete from comment where commentId=${id}`
    db.query(sql,(err,data)=>{
      if (err) {
        return res.send('错误：' + err.message)
      }
      res.send({
        code: 1,
        msg:'success'
      })
    })
}