let db = require('../db/index.js')
//获取管理员列表
exports.post=(req,res)=>{
    let id=req.body.carouselId
    let url = '/uploads/' + req.file.filename
    let sql=`insert into carousel values (${id},'${url}')`
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