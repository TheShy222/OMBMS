let db = require('../db/index.js')
//获取管理员列表
exports.post=(req,res)=>{
    let id=req.body.id
    let newpass=req.body.newpass
    let sql=`update logininfo set password='${newpass}' where id=${id}`
    db.query(sql,(err,data)=>{
      if (err) {
        return res.send('错误：' + err.message)
      }
      res.send({
        code: 1,
        msg:'修改成功'
      })
    })
}