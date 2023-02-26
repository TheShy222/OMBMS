let db = require('../db/index.js')
//添加评论
exports.put=(req,res)=>{
    let id = req.body.id
    let name = req.body.name
    let commentId =req.body.commentId
    let content = req.body.content
    let commentImg = 'http://localhost:8888/uploads/' + req.file.filename
    let likes = req.body.likes
    let orderNumber = req.body.orderNumber
    let detail = req.body.detail
    let size = req.body.size
    let sql=`update comment set id=${id},name='${name}',content='${content}',commentImg='${commentImg}',likes=${likes},orderNumber=${orderNumber},detail='${detail}',size='${size}' where commentId=${commentId}`
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