let db = require('../db/index.js')
//获取管理员列表
exports.post=(req,res)=>{
    let name=req.body.name
    let pass=req.body.password
    let id=req.body.id
    let headimg = '/uploads/' + req.file.filename
    let sql=`update loginInfo set name='${name}',password='${pass}',headimg='${headimg}' where id='${id}'`
    console.log(sql)
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