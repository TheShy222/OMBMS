let db = require('../db/index.js')
//获取供应商列表
exports.get=(req,res)=>{
    let sql=`select * from supplier`
    db.query(sql,(err,data)=>{
      if (err) {
        return res.send('错误：' + err.message)
      }
      res.send({
        code: 1,
        list:data
      })
    })
}