let db = require('../db/index.js')
//获取管理员列表
exports.post=(req,res)=>{
    let name=req.body.formData.name
    let pass=req.body.formData.password
    let id=req.body.formData.id
    let sql=`update loginInfo set name='${name}',password='${pass}' where id='${id}'`
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