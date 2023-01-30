let db = require('../db/index.js')
//获取管理员列表
exports.post=(req,res)=>{
    let id=req.body.carouselid
    let url = '/uploads/' + req.file.filename
    let sql=`update carousel set url='${url}' where carouselid=${id}`
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