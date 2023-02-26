let db = require('../db/index.js')
//添加评论
exports.post=(req,res)=>{
    let id = req.body.id
    let name = req.body.name
    let commentId =Number(Date.now().toString().slice(-6))
    let content = req.body.content
    let commentImg = 'http://localhost:8888/uploads/' + req.file.filename
    let likes = req.body.likes
    let orderNumber = req.body.orderNumber
    let detail = req.body.detail
    let size = req.body.size
    let sql=`insert into comment values (${id},'${name}',${commentId},'${content}','${commentImg}',${likes},${orderNumber},'${detail}','${size}')`
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